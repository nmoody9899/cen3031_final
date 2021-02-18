import { LogoutOutlined } from "@ant-design/icons";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// allows us to easily return reponses and/or success/fail for a thunk that calls a service
const mockServiceCreator = (body, succeeds = true) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
  });

describe("userReducer()", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toMatchSnapshot();
  });

  //next test here

  const addRes = () => ({
    //expecting type and payload
    type: "LOGGED_IN_USER",
    payload: {
      name: "user.name",
      email: "user.name@email",
      token: "idTokenResult.tokenstring",
      role: "res.data.role",
      _id: "1",
    },
  });

  it("should dispatch action.payload for LOGGED_IN_USER", () => {
    //initialize mock store with empty state
    const initialState = {};
    const store = mockStore(initialState);
    //dispatch action
    store.dispatch(addRes());

    //
    const actions = store.getActions();
    const expectedPayload = {
      //expecting type and payload
      //type: "LOGGED_IN_USER",
      name: "user.name",
      email: "user.name@email",
      token: "idTokenResult.tokenstring",
      role: "res.data.role",
      _id: "1",
    };
    expect(userReducer(initialState, addRes())).toEqual(expectedPayload);
  });
  //next test here

  it("should dispatch action.payload for LOGOUT", () => {
    //initialize mock store with empty state
    const initialState = {};
    const store = mockStore(initialState);

    const logout = () => ({
      type: "LOGOUT",
      payload: null,
    });

    //dispatch action
    store.dispatch(logout());

    //
    const actions = store.getActions();
    const expectedLogoutPayload = null;
    expect(userReducer(initialState, logout())).toEqual(expectedLogoutPayload);
  });
  //next test under this line
}); //end of describe(userReducer())
