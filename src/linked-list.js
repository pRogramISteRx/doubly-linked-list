const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if (this.length !== 0) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head !== null ? this._head.data : null;
    }

    tail() {
        return this._tail !== null ? this._tail.data : null;
    }

    at(index) {
        let currentNode = this._head;
        let count = 0;
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode.data;
    }

    insertAt(index, data) {
        let currentNode = this._head;
        if (!currentNode) {
            this.append(data);
            return this;
        }
        let count = 0;

        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }
        
        currentNode.next = new Node(currentNode.data);
        currentNode.next.next = currentNode.next;
        currentNode.next.prev = currentNode;
        currentNode.data = data;   
        
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length === 0 ? true : false;
    }

    clear() {
        this._tail = null;
        this._head = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let currentNode = this._head;
        let count = 0;
        let deletedNode = null;
        let beforeNodeToDelete = null;
        let nodeToDelete = null;
        let afterNodeToDelete = null;
        
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }

        if (count === 0) {
            return this;
        }
        beforeNodeToDelete = currentNode.prev;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;

        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.prev = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
        this.length--;
        return this;
    }

    reverse() {
        let currentNode = this._head;
        let buf = null;
        let count = this.length
        while (count !== 0) {
            buf = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = buf;
            currentNode = buf;
            count--;
        }
        buf = this._head;
        this._head = this._tail
        this._tail = buf;
        return this;
    }

    indexOf(data) {
        let currentNode = this._head;
        let index = 0;
        let check = 0;
        while (this.length !== 0) {
            if (currentNode.data === data) {
                check++;
                return index;
            }
            currentNode = currentNode.next;
            index++;
            this.length--;
        }
        if (check === 0) {
            return -1;
        }
    }
}

module.exports = LinkedList;
