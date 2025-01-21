export function extractBlockFromBlocks(blocks: any, blockName: string) {
    for (const block of blocks) {
        if (block.name === `core/${blockName}`) {
            return block;
        }
        if (block.innerBlocks && block.innerBlocks.length > 0) {
            const innerBlock: any = extractBlockFromBlocks(block.innerBlocks, blockName);
            if ( innerBlock ) {
                return innerBlock;
            }
        }
    }
    
    return null;
}