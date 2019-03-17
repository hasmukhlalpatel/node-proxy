export interface IDictionary<K,V> {
    add(key: K, value: V): void;
    remove(key: K): void;
    containsKey(key: K): boolean;
    keys(): K[];
    values(): V[];
}

export class Dictionary<K,V> implements IDictionary<K,V> {

    private _keys: K[] = [];
    private _values: V[] = [];

    // constructor(init: { key: K; value: V; }[]) {
    //     for (var x = 0; x < init.length; x++) {
    //         this[init[x].key] = init[x].value;
    //         this._keys.push(init[x].key);
    //         this._values.push(init[x].value);
    //     }
    // }

    add(key: K, value: V) {
        this[`${key}`] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: K) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[`${key}`];
    }

    keys(): K[] {
        return this._keys;
    }

    values(): any[] {
        return this._values;
    }

    containsKey(key: K) {
        if (typeof this[`${key}`] === "undefined") {
            return false;
        }

        return true;
    }

    toLookup():  IDictionary<K,V> {
        return this;
    }
}