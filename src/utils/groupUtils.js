export const sortGroup = (value, type) => {
    let tempGroup = [...value];
    if (type) {
        tempGroup.sort((first, second) => {
            const nameFirst = first.name.toUpperCase();
            const nameSecond = second.name.toUpperCase();
            if (nameFirst > nameSecond) {
                return -1;
            }
            if (nameFirst < nameSecond) {
                return 1;
            }
            return 0;
        });
    } else {
        tempGroup.sort((first, second) => {
            const nameFirst = first.name.toUpperCase();
            const nameSecond = second.name.toUpperCase();
            if (nameFirst > nameSecond) {
                return 1;
            }
            if (nameFirst < nameSecond) {
                return -1;
            }
            return 0;
        });
    }

    return tempGroup;
};
