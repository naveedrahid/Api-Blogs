import moment from "moment";

const convertDateToOurFormat = (data) => {
    if (!data) {
        return null;
    }
    return moment(data).format("MMMM Do YYYY,  h:mm a");
}
export const UtilService = {
    convertDateToOurFormat,
}