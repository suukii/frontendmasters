class ArrayList {
    constructor() {
        this.length = 0;
        this.data = {};
    }
    push(value) {
        this.data[this.length++] = value;
    }
    pop() {
        return this.delete(this.length - 1);
    }
    get(index) {
        return this.data[index];
    }
    delete(index) {
        const ans = this.data[this.length - 1];
        this._collapseTo(index);
        this.length--;
        return ans;
    }
    _collapseTo(index) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
    }
}

module.exports = {
    ArrayList,
};
