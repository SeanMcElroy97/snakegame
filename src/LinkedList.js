import LinkedListNode from './LinkedListNode'
export default class LinkedList{
    constructor(val){
        const node = new LinkedListNode(val);
        this.head=node;
        this.tail=node;
    }
}