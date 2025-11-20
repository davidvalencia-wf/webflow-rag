# Webflow RAG Helper

You are helping with a Webflow RAG (Retrieval-Augmented Generation) project. This skill provides context and specialized knowledge about this project.

## Project Structure

This is a monorepo with:
- **apps/**: Application code (e.g., web interface)
- **packages/**: Shared packages and libraries
- **etl/**: ETL (Extract, Transform, Load) pipelines
- **infra/**: Infrastructure as code
- **scripts/**: Utility scripts

## Common Tasks

### Working with RAG Systems
When working on RAG-related features:
1. Consider the vector database configuration
2. Ensure embeddings are generated correctly
3. Test retrieval quality with sample queries
4. Validate context relevance

### Development Workflow
- Use `pnpm dev` to run the development server
- Use `pnpm build` to build all packages
- Use `pnpm lint` to check code quality
- Use `pnpm typecheck` to verify TypeScript types

### Best Practices
- Always typecheck before committing
- Write tests for new features
- Document API changes
- Keep dependencies up to date

## Technologies to Consider
- Vector databases (e.g., Pinecone, Weaviate, Qdrant)
- Embedding models (OpenAI, Cohere, etc.)
- LLM integration
- Document processing pipelines
