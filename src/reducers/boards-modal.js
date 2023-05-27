const SET_ID = 'scratch-gui/boards-modal/setId';
const SET_BOARDS = 'scratch-gui/boards-modal/setBoards';
const SET_BOARD_ID = 'scratch-gui/boards-modal/setBoardId';

const initialState = {
    boardId: null,
    boardsList: [],
    extensionId: null
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_ID:
        return Object.assign({}, state, {
            extensionId: action.extensionId
        });
    case SET_BOARDS:
        return Object.assign({}, state, {
            boardsList: action.boardsList
        });
    case SET_BOARD_ID:
        return Object.assign({}, state, {
            boardId: action.boardId
        });
    default:
        return state;
    }
};

const setBoardsModalExtensionId = function (extensionId) {
    return {
        type: SET_ID,
        extensionId: extensionId
    };
};

const setBoardsModalBoardsList = function (boardsList) {
    return {
        type: SET_BOARDS,
        boardsList: boardsList
    };
};

const setBoardsModalBoardId = function (boardId) {
    return {
        type: SET_BOARD_ID,
        boardId: boardId
    };
};

export {
    reducer as default,
    initialState as boardsModalInitialState,
    setBoardsModalExtensionId,
    setBoardsModalBoardsList,
    setBoardsModalBoardId
};
