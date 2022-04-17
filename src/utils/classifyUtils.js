const classifyUtils = {
    getClassifyOfObject: (idConver, classifies) => {
        console.log('classifies', classifies);
        return classifies.find((ele) =>
            ele.conversations.find((id) => id === idConver)
        );
    },
};

export default classifyUtils;
