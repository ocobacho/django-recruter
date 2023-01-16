function not(a, b) {
    return a.filter((value) => notInList(value, b));
}

function intersection(a, b) {
    return a.filter((value) => !notInList(value, b));
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

const notInList = (item, list) => {
    let found = list.filter((litem) => {
        return litem.id === item.id;
    });
    return found.length === 0;
};

export {not, intersection, union, notInList}