import {
  LOADING,
  FETCH_CONTRACTS,
  FETCH_CONTRACT,
  FETCH_CARD,
  HANDLE_CHANGE,
  CREATE_CONTRACT,
  CREATE_CARD,
  IMAGE_UPLOADED,
  SAME_DETAILS,
  DELETE_CONTRACT,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_CARDS,
  CLEAR_VALUES,
  CONTRACT_FAIL,
  FETCH_SERVICES,
  UPDATE_CARD,
  CARD_FAIL,
  FETCH_USERS,
  DELETE_USER,
  RENEW_CONTRACT,
  COPY_CONTRACT,
  ALL_VALUES,
  ADD_VALUE,
  DELETE_SERVICE,
  UPDATE_CONTRACT,
  SERVICE_REPORT,
  CLOSE_MODAL,
  JOB_STATS,
  DOCUMENTS_UPLOAD,
  RENEWAL_FILE,
  JOB_NOT_FILE,
  DOCUMENTS_DELETE,
  UPDATE_CARD_FAIL,
  EDIT_SERVICE,
  ADD_EMAILS,
  REMOVE_EMAILS,
  SCHEDULE_MAIL,
  FEEDBACK_STATS,
  SUBMIT_FEEDBACK,
  SERVICE_INTIMATION,
  SERVICE_INTIMATION_FAIL,
  BRANCH_REPORT,
  BRANCH_REPORT_FAIL,
} from "./action";

import { initialState } from "./data_context";

const data_reducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        loading: false,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    }
    case DISPLAY_ALERT: {
      return {
        ...state,
        loading: true,
        showAlert: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        // token: action.payload.token,
        // user: action.payload.name,
        // role: action.payload.role,
        alertText: action.payload.msg,
        alertType: "success",
        showAlert: true,
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.name,
        role: action.payload.role,
        alertText: "Redirecting To Dashboard",
        alertType: "success",
        showAlert: true,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
      };
    }
    case LOGOUT: {
      return {
        ...initialState,
        loading: false,
        user: null,
        token: null,
      };
    }
    case FETCH_CONTRACTS: {
      return {
        ...state,
        loading: false,
        contracts: action.payload,
      };
    }
    case RENEWAL_FILE: {
      return {
        ...state,
        loading: false,
        renewalFile: action.payload,
      };
    }
    case FETCH_SERVICES: {
      return {
        ...state,
        loading: false,
        allServices: action.payload,
      };
    }
    case FETCH_CONTRACT: {
      return {
        ...state,
        loading: false,
        singleContract: action.payload.contract,
        contract: action.payload.id,
      };
    }
    case FETCH_CARD: {
      return {
        ...state,
        loading: false,
        card: action.payload,
      };
    }

    case FETCH_USERS: {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    }

    case DELETE_USER: {
      return {
        ...state,
        loading: false,
        alertText: action.payload,
        alertType: "danger",
        showAlert: true,
        del: true,
      };
    }
    case HANDLE_CHANGE: {
      const { name, value, id } = action.payload;
      if (id === "billToAddress") {
        return {
          ...state,
          billToAddress: { ...state.billToAddress, [name]: value },
        };
      }
      if (id === "shipToAddress") {
        return {
          ...state,
          shipToAddress: { ...state.shipToAddress, [name]: value },
        };
      }
      if (id === "billToContact") {
        return {
          ...state,
          billToContact: { ...state.billToContact, [name]: value },
        };
      }
      if (id === "shipToContact") {
        return {
          ...state,
          shipToContact: { ...state.shipToContact, [name]: value },
        };
      }
      if (id === "preferred") {
        return {
          ...state,
          preferred: { ...state.preferred, [name]: value },
        };
      }
      if (id === "billToContact1") {
        return {
          ...state,
          billToContact1: { ...state.billToContact1, [name]: value },
        };
      }
      if (id === "billToContact2") {
        return {
          ...state,
          billToContact2: { ...state.billToContact2, [name]: value },
        };
      }
      if (id === "billToContact3") {
        return {
          ...state,
          billToContact3: { ...state.billToContact3, [name]: value },
        };
      }
      if (id === "shipToContact1") {
        return {
          ...state,
          shipToContact1: { ...state.shipToContact1, [name]: value },
        };
      }
      if (id === "shipToContact2") {
        return {
          ...state,
          shipToContact2: { ...state.shipToContact2, [name]: value },
        };
      }
      if (id === "serviceChemicals") {
        return {
          ...state,
          serviceChemicals: { ...state.serviceChemicals, [name]: value },
        };
      }
      if (id === "shipToContact3") {
        return {
          ...state,
          shipToContact3: { ...state.shipToContact3, [name]: value },
        };
      }
      return { ...state, [name]: value };
    }
    case SAME_DETAILS: {
      return {
        ...state,
        loading: false,
        shipToAddress: state.billToAddress,
        shipToContact1: state.billToContact1,
        shipToContact2: state.billToContact2,
        shipToContact3: state.billToContact3,
      };
    }
    case CREATE_CONTRACT: {
      return {
        ...state,
        loading: false,
        contractCreated: true,
        contract: action.payload.contractId,
        alertText: "Contract Created Successfully",
        alertType: "success",
        showAlert: true,
      };
    }
    case CONTRACT_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
      };
    }
    case DELETE_CONTRACT: {
      return {
        ...state,
        loading: false,
        contract: 1,
        alertText: "Contract has been deleted",
        alertType: "danger",
        showAlert: true,
        del: true,
      };
    }

    case DELETE_SERVICE: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
        del: true,
      };
    }

    case EDIT_SERVICE: {
      return {
        ...state,
        loading: false,
        treatmentLocation: action.payload.treatmentLocation,
        frequency: action.payload.frequency,
        business: action.payload.business,
        edit: true,
        area: action.payload.area.split(" ")[0],
        cardId: action.payload._id,
      };
    }
    case CREATE_CARD: {
      return {
        ...state,
        loading: false,
        contractCreated: false,
        alertText: "Card has been saved",
        alertType: "success",
        showAlert: true,
        ratrid: "No",
        edit: false,
        cardId: "",
      };
    }
    case CARD_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: "Ratrid cannot be added with other services ",
        alertType: "danger",
        showAlert: true,
      };
    }
    case CREATE_CARDS: {
      return {
        ...state,
        loading: false,
        alertText: action.payload,
        alertType: "success",
        showAlert: true,
      };
    }

    case RENEW_CONTRACT: {
      return {
        ...state,
        renew: true,
      };
    }

    case COPY_CONTRACT: {
      return {
        ...state,
        loading: false,
        contractNo: state.singleContract.contractNo,
        type: state.singleContract.type,
        sales: state.singleContract.sales,
        startDate: state.singleContract.startDate.slice(0, 10),
        business: state.singleContract.business,
        preferred: {
          day: state.singleContract.preferred.day,
          time: state.singleContract.preferred.time,
        },
        branch: state.singleContract.branch,
        contractCode: state.singleContract.contractCode,
        area: state.singleContract.area,
        billingFrequency: state.singleContract.billingFrequency,
        specialInstruction: state.singleContract.specialInstruction.toString(),
        billToAddress: {
          prefix: state.singleContract.billToAddress.prefix,
          name: state.singleContract.billToAddress.name,
          address1: state.singleContract.billToAddress.address1,
          address2: state.singleContract.billToAddress.address2,
          address3: state.singleContract.billToAddress.address3,
          address4: state.singleContract.billToAddress.address4,
          nearBy: state.singleContract.billToAddress.nearBy,
          city: state.singleContract.billToAddress.city,
          pincode: state.singleContract.billToAddress.pincode,
        },
        billToContact1: {
          name: state.singleContract.billToContact1.name,
          contact: state.singleContract.billToContact1.contact,
          email: state.singleContract.billToContact1.email,
        },

        billToContact2: {
          name: state.singleContract.billToContact2.name,
          contact: state.singleContract.billToContact2.contact,
          email: state.singleContract.billToContact2.email,
        },

        billToContact3: {
          name: state.singleContract.billToContact3.name,
          contact: state.singleContract.billToContact3.contact,
          email: state.singleContract.billToContact3.email,
        },
        shipToAddress: {
          prefix: state.singleContract.shipToAddress.prefix,
          name: state.singleContract.shipToAddress.name,
          address1: state.singleContract.shipToAddress.address1,
          address2: state.singleContract.shipToAddress.address2,
          address3: state.singleContract.shipToAddress.address3,
          address4: state.singleContract.shipToAddress.address4,
          nearBy: state.singleContract.shipToAddress.nearBy,
          city: state.singleContract.shipToAddress.city,
          pincode: state.singleContract.shipToAddress.pincode,
        },
        shipToContact1: {
          name: state.singleContract.shipToContact1.name,
          contact: state.singleContract.shipToContact1.contact,
          email: state.singleContract.shipToContact1.email,
        },

        shipToContact2: {
          name: state.singleContract.shipToContact2.name,
          contact: state.singleContract.shipToContact2.contact,
          email: state.singleContract.shipToContact2.email,
        },

        shipToContact3: {
          name: state.singleContract.shipToContact3.name,
          contact: state.singleContract.shipToContact3.contact,
          email: state.singleContract.shipToContact3.email,
        },
      };
    }

    case CLEAR_VALUES: {
      return {
        ...state,
        loading: false,
        frequency: "Daily",
        service: [],
        comments: "All job done",
        type: "NC",
        completion: "Completed",
        image: [],
        contractNo: "",
        sales: "PTL",
        business: "1 RK",
        area: "",
        endContract: "1 Year",
        specialInstruction: "",
        billingFrequency: "",
        renew: false,
        billToAddress: {
          prefix: "Mr",
          name: "",
          address1: "",
          address2: "",
          address3: "",
          address4: "",
          nearBy: "",
          city: "",
          pincode: "",
        },
        shipToAddress: {
          prefix: "Mr",
          name: "",
          address1: "",
          address2: "",
          address3: "",
          address4: "",
          nearBy: "",
          city: "",
          pincode: "",
        },
        billToContact1: {
          name: "Mr./Ms.",
          contact: "(M)/(T)",
          email: "",
        },

        billToContact2: {
          name: "",
          contact: "",
          email: "",
        },

        billToContact3: {
          name: "",
          contact: "",
          email: "",
        },

        shipToContact1: {
          name: "Mr./Ms.",
          contact: "(M)/(T)",
          email: "",
        },

        shipToContact2: {
          name: "",
          contact: "",
          email: "",
        },

        shipToContact3: {
          name: "",
          contact: "",
          email: "",
        },
        startDate: new Date().toISOString().slice(0, 10),
        preferred: { day: "", time: "10 am - 12 pm" },
        contractCreated: false,
        search: "",
        searchSD: "",
        searchED: "",
        del: false,
        branch: "MUM - 1",
        contractCode: "",
      };
    }
    case UPDATE_CONTRACT: {
      return {
        ...state,
        loading: false,
        alertText: "Contract has been updated",
        alertType: "success",
        showAlert: true,
      };
    }
    case IMAGE_UPLOADED: {
      return {
        ...state,
        loading: false,
        image: action.payload,
      };
    }
    case UPDATE_CARD: {
      return {
        ...state,
        loading: false,
        alertText: "Email Has Been Sent",
        alertType: "success",
        showAlert: true,
      };
    }
    case UPDATE_CARD_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: "Input Updated. Email Not Sent",
        alertType: "success",
        showAlert: true,
      };
    }

    case SERVICE_REPORT: {
      return {
        ...state,
        loading: false,
        serviceReport: action.payload,
        modal: true,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        loading: false,
        modal: false,
        serviceReport: "",
      };
    }

    case ALL_VALUES: {
      return {
        ...state,
        loading: false,
        adminList: action.payload,
      };
    }

    case ADD_VALUE: {
      return {
        ...state,
        loading: false,
        addComment: "",
        addSale: "",
        addBusines: "",
        addCode: "",
        serviceChemicals: {
          label: "",
          value: "",
          chemical: "",
        },
        alertText: action.payload,
        alertType: "success",
        showAlert: true,
      };
    }

    case JOB_STATS: {
      return {
        ...state,
        loading: false,
        jobStats: action.payload.allJobs,
        serviceStats: action.payload.allService,
        businessCount: action.payload.allBusinessCount,
      };
    }

    case DOCUMENTS_UPLOAD: {
      return {
        ...state,
        loading: false,
        alertText: "Document has been uploaded",
        alertType: "success",
        showAlert: true,
      };
    }

    case DOCUMENTS_DELETE: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
      };
    }

    case JOB_NOT_FILE: {
      return {
        ...state,
        loading: false,
        serviceReport: action.payload.link,
        modal: true,
        searchSD: "",
        searchED: "",
      };
    }
    case ADD_EMAILS: {
      const { emails } = action.payload;

      return {
        ...state,
        feedbackEmails: state.feedbackEmails.concat(emails),
      };
    }

    case REMOVE_EMAILS: {
      return {
        ...state,
        feedbackEmails: state.feedbackEmails.filter(
          (item) => item.email !== action.payload.email
        ),
      };
    }

    case SCHEDULE_MAIL: {
      return {
        ...state,
        loading: false,
        alertText: "Email has been schedule for tomorrow at 8am",
        alertType: "success",
        showAlert: true,
        feedbackEmails: [],
      };
    }

    case FEEDBACK_STATS: {
      return {
        ...state,
        loading: false,
        allRatings: action.payload.result1,
        pestRatings: action.payload.result,
        feedbackFile: action.payload.link,
      };
    }

    case SUBMIT_FEEDBACK: {
      return {
        ...state,
        feedbackSubmitted: true,
      };
    }

    case SERVICE_INTIMATION: {
      return {
        ...state,
        loading: false,
        alertText: "Email Has Been Sent",
        alertType: "success",
        showAlert: true,
      };
    }

    case SERVICE_INTIMATION_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: "Please try today/tomorrow after 4pm",
        alertType: "danger",
        showAlert: true,
      };
    }

    case BRANCH_REPORT: {
      return {
        ...state,
        loading: false,
        alertText: "Report Generated",
        alertType: "success",
        showAlert: true,
      };
    }

    case BRANCH_REPORT_FAIL: {
      return {
        ...state,
        loading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
      };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default data_reducer;
