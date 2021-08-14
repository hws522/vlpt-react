export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (param) => async (dispatch) => {
        dispatch({ type, param });
        try {
            const payload = await promiseCreator(param);
            dispatch({ type: SUCCESS, payload }); // 성공
        } catch (e) {
            dispatch({ type: ERROR, payload: e, error: true }); // 실패
        }
    };
};

export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null,
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null,
    }),
    // 성공 상태
    success: (payload) => ({
        loading: false,
        data: payload,
        error: null,
    }),
    // 실패 상태
    error: (error) => ({
        loading: false,
        data: null,
        error: error,
    }),
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ? state[key].data : null),
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.error),
                };
            default:
                return state;
        }
    };
};

// 특정 id 를 처리하는 Thunk 생성함수
const defaultIdSelector = (param) => param;
export const createPromiseThunkById = (
    type,
    promiseCreator,
    // 파라미터에서 id 를 어떻게 선택 할 지 정의하는 함수입니다.
    // 기본 값으로는 파라미터를 그대로 id로 사용합니다.
    // 하지만 만약 파라미터가 { id: 1, details: true } 이런 형태라면
    // idSelector 를 param => param.id 이런식으로 설정 할 수 있곘죠.
    idSelector = defaultIdSelector
) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return (param) => async (dispatch) => {
        const id = idSelector(param);
        dispatch({ type, meta: id });
        try {
            const payload = await promiseCreator(param);
            dispatch({ type: SUCCESS, payload, meta: id });
        } catch (e) {
            dispatch({ type: ERROR, error: true, payload: e, meta: id });
        }
    };
};

// id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        const id = action.meta;
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.loading(
                            // state[key][id]가 만들어져있지 않을 수도 있으니까 유효성을 먼저 검사 후 data 조회
                            keepData ? state[key][id] && state[key][id].data : null
                        ),
                    },
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.success(action.payload),
                    },
                };
            case ERROR:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.error(action.payload),
                    },
                };
            default:
                return state;
        }
    };
};
