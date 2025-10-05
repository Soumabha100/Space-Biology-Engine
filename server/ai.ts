import OpenAI from 'openai'
import { pipeline, type PipelineType } from '@xenova/transformers'
import type { Data } from './index.js';

class EmbeddingSingleton {
    static task: PipelineType = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2'; // Using a popular, efficient model
    static instance: any = null;

    static async getInstance(progress_callback: any = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

class AI {
    openai: OpenAI
    model: any
    embeddingModel: any
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.GEMINI_API_KEY || '',
            baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
        })
        this.model = process.env.OPENAI_MODEL || 'gemini-2.5-flash'
        this.embeddingModel = process.env.EMBEDDING_MODEL || 'gemini-embedding-001'
    }

    async genEmbedding(text: string): Promise<number[] | undefined> {
        try {
            const extractor = await EmbeddingSingleton.getInstance();
            const result = await extractor(text, { pooling: 'mean', normalize: true });
            return Array.from(result.data);
        } catch (error) {
            console.error('Error generating local embedding:', error)
            throw new Error('Failed to generate local embedding')
        }
    }



    calcSim(embedding1: number[], embedding2: number[]): number {
        if (embedding1.length !== embedding2.length) {
            throw new Error('Embeddings must have the same length')
        }

        let dotProduct = 0
        let norm1 = 0
        let norm2 = 0

        for (let i = 0; i < embedding1.length; i++) {
            dotProduct += embedding1[i]! * embedding2[i]!
            norm1 += embedding1[i]! * embedding1[i]!
            norm2 += embedding2[i]! * embedding2[i]!
        }

        norm1 = Math.sqrt(norm1)
        norm2 = Math.sqrt(norm2)

        if (norm1 === 0 || norm2 === 0) {
            return 0
        }

        return dotProduct / (norm1 * norm2)
    }

    async semanticSearch<T extends Data>(query: string, documents: T[], limit: number = 10): Promise<Array<T & {relevanceScore: number}>> {
        try {
            const queryEmbedding = await this.genEmbedding(query)
            const results: (T & { relevanceScore: number })[] = []
            documents.map(doc => {
                if (doc.embedding) {
                    const sim = this.calcSim(queryEmbedding!, doc.embedding)
                    results.push({
                        ...doc,
                        relevanceScore: sim
                    })
                    return
                }
                results.push({
                    ...doc,
                    relevanceScore: 0
                })
                return
            })

            return results
                .sort((a, b) => b.relevanceScore - a.relevanceScore)
                .slice(0, limit)
        } catch (error) {
            console.error('Error in semantic search:', error)
            throw new Error('Semantic search failed')
        }
    }

    buildSearchableText(data: any, type: string): string {
        if (type === 'experiment') {
            return [
                data.title,
                data.description,
                data.objectives?.join(' '),
                data.tags?.join(' '),
                data.summary
            ].filter(Boolean).join(' ')
        } else {
            return [
                data.name,
                data.scientificName,
                data.commonName,
                data.description,
                data.kingdom,
                data.phylum,
                data.class,
                data.order,
                data.family,
                data.genus,
                data.species,
                data.habitat,
                data.characteristics?.behavior,
                data.characteristics?.adaptations?.join(' ')
            ].filter(Boolean).join(' ')
        }
    }

    async processDoc(document: any, type: string): Promise<object> {
        try {
            const schTxt = this.buildSearchableText(document, type)
            const embedding = await this.genEmbedding(schTxt)
            const analysis = await this.genInfo(document.abstract, type)

            return {
                ...document,
                schTxt,
                embedding,
                ...analysis,
                processedAt: new Date()
            }
        } catch (error) {
            console.error('Error processing document:', error)
            throw new Error('Document processing failed')
        }
    }

    async batchProcessDocs(documents: Array<any>, type: string): Promise<Array<Object>> {
        const results = []
        const errors = []
        console.log("Starting batch process")
        for (let i = 0; i < documents.length; i++) {
            try {
                const processed = await this.processDoc(documents[i], type)
                results.push(processed)
                console.log(`Processed document ${i + 1}/${documents.length}`)
            } catch (error) {
                errors.push({
                    index: i,
                    document: documents[i],
                    error: (error as any).message
                })
                console.error(`Failed to process document ${i + 1}:`, (error as any).message)
            }
        }

        return results
    }

    async genInfo(content: string, type: string = 'experiment'): Promise<object> {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || 'AIzaSyDIFhqc8SsefTwmvv4oU_7MNkwVW-vNu8s',
            baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
        })
        const model = process.env.OPENAI_MODEL || 'gemini-2.5-flash'
        try {
            const prompt = this._buildGenInfoPrompt(content, type)
            const response = await openai.chat.completions.create({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert in space biology and scientific research. Provide concise, accurate summaries with relevant tags.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_completion_tokens: 2048
            })
            const summaryText = response.choices[0]?.message.content || ''
            return this._parseGenInfoResponse(summaryText)
        } catch (error) {
            console.error('Error generating AI summary:', error)
            throw new Error('Failed to generate AI summary')
        }
    }

    _buildGenInfoPrompt(content: string, type: string) {
        const basePrompt = `Analyze the following ${type} data and provide a structured summary.`

        if (type === 'experiment') {
            return `${basePrompt}

Focus on:
- Research objectives and methodology
- Key findings and results
- Space environment factors
- Biological implications
- Scientific significance

Format your response as:
SUMMARY: [2-3 sentence overview]
KEY_POINTS: [bullet points of main findings]
TAGS: [comma-separated relevant tags]
CONFIDENCE: [0-1 confidence score]
OBJECTIVES: [comma-separated objectives]

Data: ${content}`
        } else {
            return `${basePrompt}

Focus on:
- Taxonomic classification
- Biological characteristics
- Adaptations and behaviors
- Habitat and environmental factors
- Research relevance

Format your response as:
SUMMARY: [2-3 sentence overview]
KEY_POINTS: [bullet points of key characteristics]
TAGS: [comma-separated relevant tags]
CONFIDENCE: [0-1 confidence score]

Data: ${content}`
        }
    }

    _parseGenInfoResponse(response: string) {
        const lines = response.split('\n')
        let summary = ''
        let keyPoints: string[] | [] = []
        let tags: string[] | [] = []
        let objs: string[] | [] = []
        let confidence = 0.8

        for (const line of lines) {
            if (line.startsWith('SUMMARY:')) {
                summary = line.replace('SUMMARY:', '').trim()
            } else if (line.startsWith('KEY_POINTS:')) {
                keyPoints = line.replace('KEY_POINTS:', '').trim().split(/[•\-\*]/).map(point => point.trim()).filter(Boolean)
            } else if (line.startsWith('TAGS:')) {
                tags = line.replace('TAGS:', '').trim().split(',').map(tag => tag.trim()).filter(Boolean)
            } else if (line.startsWith('CONFIDENCE:')) {
                const conf = line.replace('CONFIDENCE:', '').trim()
                confidence = parseFloat(conf) || 0.8
            } else if (line.startsWith("OBJECTIVES:")) {
                objs = line.replace("OBJECTIVES:", "").trim().split(",").map(o => o.trim()).filter(Boolean)
            }
        }

        return {
            summary: summary || 'Summary not available',
            keyPoints: keyPoints.length > 0 ? keyPoints : ['No key points identified'],
            tags: tags.length > 0 ? tags : ['space-biology'],
            confidence,
            objectives: objs
        }
    }
}

const sampleExperiments = [
    {
        id: 'exp-001',
        title: 'Plant Growth in Microgravity',
        description: 'Study of Arabidopsis thaliana growth patterns in space environment',
        mission: 'ISS Expedition 65',
        objectives: ['Analyze root growth patterns', 'Study gene expression changes'],
        methodology: 'Standard NASA protocols',
        principalInvestigator: 'Dr. Sarah Johnson',
        institution: 'NASA Ames Research Center'
    },
    {
        id: 'exp-002',
        title: 'Bacterial Behavior in Space',
        description: 'Investigation of E. coli behavior and antibiotic resistance in microgravity',
        mission: 'ISS Expedition 66',
        objectives: ['Study bacterial growth rates', 'Analyze antibiotic resistance patterns'],
        methodology: 'Microbiological analysis protocols',
        principalInvestigator: 'Dr. Michael Chen',
        institution: 'NASA Johnson Space Center'
    }
]

const sampleOrganisms = [
    {
        id: 'org-001',
        name: 'Arabidopsis thaliana',
        scientificName: 'Arabidopsis thaliana',
        kingdom: 'Plantae',
        phylum: 'Magnoliophyta',
        class: 'Magnoliopsida',
        description: 'Model plant organism used in space biology research',
        habitat: 'Terrestrial',
        characteristics: {
            behavior: 'Fast-growing annual plant',
            adaptations: ['Small genome', 'Short life cycle', 'Easy to grow']
        }
    },
    {
        id: 'org-002',
        name: 'Escherichia coli',
        scientificName: 'Escherichia coli',
        kingdom: 'Bacteria',
        phylum: 'Proteobacteria',
        class: 'Gammaproteobacteria',
        description: 'Common bacterial model organism',
        habitat: 'Intestinal tract',
        characteristics: {
            behavior: 'Facultative anaerobe',
            adaptations: ['Rapid reproduction', 'Well-studied genetics']
        }
    }
]

export default AI


// async function example() {
//     const engine = new AI()
//     const processedExp = await engine.processDoc(sampleExperiments[0], 'experiment')
//     console.log('Processed Experiment:', processedExp)
//     const batchResult = await engine.batchProcessDocs(sampleOrganisms, 'organism')
//     console.log('Batch Processing Result:', batchResult)
//     const searchResults = await engine.semanticSearch(
//         'plant growth microgravity',
//         batchResult,
//         5
//     )
//     console.log('Search Results:', searchResults)
// }

// example()