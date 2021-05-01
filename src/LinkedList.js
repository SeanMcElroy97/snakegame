import LinkedListNode from './LinkedListNode'
export default class LinkedList{
    constructor(row, col){
        const node = new LinkedListNode(row,col);
        this.head=node;
        this.tail=node;
    }
}