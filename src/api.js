import axios from "axios";

const apiCLient = axios.create({
    baseURL: "https://trading-dashboard-fe.onrender.com/api"
})


export const fetchAccounts = () => {
    return apiCLient.get("/accounts").then((response) => {
        console.log( {accounts: response.data.accounts} )
        
        console.log(response.data.accounts)
        return {accounts: response.data.accounts}
    }).catch((err) => {
        console.log(err);
      });
}