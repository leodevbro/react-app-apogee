import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// IMPORTANT START
export enum UserRoleEnum {
  admin = "admin",
  accounting = "accounting",
  sales = "sales",
}

export enum AuthFlowEnum {
  notLoggedIn = "notLoggedIn",
  pleaseCompleteYourAccount = "pleaseCompleteYourAccount",
  accountConfirmationInProgress = "accountConfirmationInProgress",
  loggedIn = "loggedIn",
}

// IMPORTANT END

//
//
//
//

export type BasicStatusOfUserT =
  | AuthFlowEnum.notLoggedIn
  | AuthFlowEnum.pleaseCompleteYourAccount
  | AuthFlowEnum.accountConfirmationInProgress
  //
  | UserRoleEnum.admin
  | UserRoleEnum.accounting
  | UserRoleEnum.sales;

export interface ISweetState {
  userStatus: BasicStatusOfUserT;
  viewOfIdeabooksList: "list" | "grid";
  showDevControl: boolean;
  showFullSidebarForDesktop: boolean;
  showSidebarForMobile: boolean;
  ideabooksListIsEmpty: boolean;
  ideabookIsEmpty: boolean;
}

export enum LSEnum {
  bedro_auth = "bedro_auth",
  bedro_viewOfIdeabooksList = "bedro_viewOfIdeabooksList",
  bedro_showDevControl = "bedro_showDevControl",
  bedro_showFullSidebarForDesktop = "bedro_showFullSidebarForDesktop",
  bedro_showSidebarForMobile = "bedro_showSidebarForMobile",
  bedro_ideabooksListIsEmpty = "bedro_ideabooksListIsEmpty",
  bedro_ideabookIsEmpty = "bedro_ideabookIsEmpty",
  bedro_sectionOfSettings = "bedro_sectionOfSettings",
}

const authLocalStorage = (window.localStorage.getItem(LSEnum.bedro_auth) ||
  AuthFlowEnum.notLoggedIn) as BasicStatusOfUserT;

const viewOfIdeabooksListLocalStorage = (window.localStorage.getItem(
  LSEnum.bedro_viewOfIdeabooksList,
) || "grid") as "list" | "grid";

const showDevControlLocalStorage = (window.localStorage.getItem(LSEnum.bedro_showDevControl) ||
  "false") as "true" | "false";

const showFullSidebarForDesktopLocalStorage = (window.localStorage.getItem(
  LSEnum.bedro_showFullSidebarForDesktop,
) || "false") as "true" | "false";

const showSidebarForMobileLocalStorage = (window.localStorage.getItem(
  LSEnum.bedro_showSidebarForMobile,
) || "false") as "true" | "false";

const ideabooksListIsEmpty_LS = (window.localStorage.getItem(LSEnum.bedro_ideabooksListIsEmpty) ||
  "false") as "true" | "false";

const ideabookIsEmpty_LS = (window.localStorage.getItem(LSEnum.bedro_ideabookIsEmpty) ||
  "false") as "true" | "false";

const initialState: ISweetState = {
  // userStatus: AuthFlowEnum.notLoggedIn,
  userStatus: authLocalStorage,
  viewOfIdeabooksList: viewOfIdeabooksListLocalStorage,
  showDevControl: showDevControlLocalStorage === "true" ? true : false,
  showFullSidebarForDesktop: showFullSidebarForDesktopLocalStorage === "true" ? true : false,
  showSidebarForMobile: showSidebarForMobileLocalStorage === "true" ? true : false,
  ideabooksListIsEmpty: ideabooksListIsEmpty_LS === "true" ? true : false,
  ideabookIsEmpty: ideabookIsEmpty_LS === "true" ? true : false,
};

export const sweetSlice = createSlice({
  name: "sweet",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeUserStatus: (state, payload: PayloadAction<BasicStatusOfUserT>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // userStatus
      const candStatus = payload.payload;
      // console.log("payload: ", payload);
      if (candStatus !== state.userStatus) {
        state.userStatus = candStatus;
        window.localStorage.setItem(LSEnum.bedro_auth, candStatus);
      }
    },

    changeViewOfIdeabooksList: (state, payload: PayloadAction<"list" | "grid">) => {
      const candView = payload.payload;

      if (["list", "grid"].includes(candView)) {
        state.viewOfIdeabooksList = candView;
        window.localStorage.setItem(LSEnum.bedro_viewOfIdeabooksList, candView);
      }
    },

    changeShowDevControl: (state, payload: PayloadAction<boolean>) => {
      const cand = payload.payload;

      state.showDevControl = cand;
      window.localStorage.setItem(LSEnum.bedro_showDevControl, cand ? "true" : "false");
    },

    changeShowFullSidebarForDesktop: (state, payload: PayloadAction<boolean>) => {
      const cand = payload.payload;

      state.showFullSidebarForDesktop = cand;
      window.localStorage.setItem(LSEnum.bedro_showFullSidebarForDesktop, cand ? "true" : "false");
    },

    changeShowSidebarForMobile: (state, payload: PayloadAction<boolean>) => {
      const cand = payload.payload;

      state.showSidebarForMobile = cand;
      window.localStorage.setItem(LSEnum.bedro_showSidebarForMobile, cand ? "true" : "false");
    },

    changeIdeabooksListIsEmpty: (state, payload: PayloadAction<boolean>) => {
      const cand = payload.payload;

      state.ideabooksListIsEmpty = cand;
      window.localStorage.setItem(LSEnum.bedro_ideabooksListIsEmpty, cand ? "true" : "false");
    },

    changeIdeabookIsEmpty: (state, payload: PayloadAction<boolean>) => {
      const cand = payload.payload;

      state.ideabookIsEmpty = cand;
      window.localStorage.setItem(LSEnum.bedro_ideabookIsEmpty, cand ? "true" : "false");
    },

    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {
  changeUserStatus,
  changeViewOfIdeabooksList,
  changeShowDevControl,
  changeShowFullSidebarForDesktop,
  changeShowSidebarForMobile,

  changeIdeabooksListIsEmpty,
  changeIdeabookIsEmpty,
} = sweetSlice.actions;

export const allBranchesOfBedro: { id: string; name: string }[] = [
  { id: "0", name: "125-Anaheim, CA" },
  { id: "1", name: "126-Anaheim, CA" },
  { id: "2", name: "127-Anaheim, CA" },
  { id: "3", name: "128-Anaheim, CA" },
];

export const sweetReducer = sweetSlice.reducer;

// export default counterSlice.reducer;
