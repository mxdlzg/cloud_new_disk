import React from 'react';
import {LinkedList} from 'LinkedList';
class Stack{
    constructor() {
        this.list = new LinkedList();
    }

    push(item) {
        this.list.addFirst(item);
    }

    pop() {
        if(!this.list.length) {
            return;
        }

        let val = this.list.head.data;
        this.list.removeFirst();

        return val;
    }

    peek() {
        if(!this.list.head) { return; }
        return this.list.head.data;
    }

    get length() {
        return this.list.length;
    }
}

export default Stack;