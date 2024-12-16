import React, { useEffect, useState } from "react";
import { fetchAccounts } from "../api"; 

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts()
      .then((response) => {
        console.log("Accounts data:", response.accounts); 
        setAccounts(response.accounts); 
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setError("Failed to fetch accounts");
      });
  }, []);

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <div>
      {accounts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Account Balance</th>
              <th>Account Equity</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index}>
                <td>{new Date(account.date).toLocaleDateString()}</td>
                <td>£{account.account_balance.toFixed(2)}</td>
                <td>£{account.account_equity.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading accounts...</p> 
      )}
    </div>
  );
};

export default Accounts;
