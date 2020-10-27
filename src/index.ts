import * as CrypthoJS from "crypto-js";

class Block{
    
    static calculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string):string => 
    CrypthoJS.SHA256(index + previousHash + timestamp + data).toString();
    
    static validateStructure = (aBlock: Block): boolean => 
    typeof aBlock.index === "number" && 
    typeof aBlock.hash === "string" && 
    typeof aBlock.previousHash === "string" && 
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number"
    
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number,hash: string,previousHash: string,data: string,timestamp: number){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0,"202020","","hello",123456);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain

const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlcok: Block = getLatestBlock();
    const newIndex: number = previousBlcok.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex,previousBlcok.hash,newTimeStamp,data);
    const newBlock: Block = new Block(newIndex, newHash, previousBlcok.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
}

const getHashForBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    } else if(getHashForBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockChain.push(candidateBlock);
    }
}

createNewBlock("second Block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockChain);

export{};