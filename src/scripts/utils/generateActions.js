export const generateActions = (actions) => {
    let actionMap = {};

    for (let i in actions) {
        if (i < actions.length) {
            actionMap[actions[i]] = actions[i];
        }
    }

    return actionMap;
}