using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using stockcs.HelperClasses;

namespace stockcs.HelperFunctions
{

    /// <summary>
    /// Assemble queries for the Yahoo API based on YQL
    /// </summary>
    class QueryAssembly
    {

        /// <summary>
        /// Build Search query based on the following attributes saved under SearchQuery object
        ///     CompanyName
        ///     StartDate
        ///     EndDate
        ///     Resoulation
        /// </summary>
        /// <param name="Query">Holds company search queries results</param>
        public static void buildStockQuery(SearchQuery Query)
        {
            Queries Yahoo_Call = new Queries();
            CustomFileHander QueryFile = new CustomFileHander();

            string saveLocation = "Save File location not set";

            //Set yahoo's address in YQL for attributes to be appended to
            string YQL = "http://ichart.yahoo.com/table.csv?s=";

            //Add attributes to search query
            //--------------------------------
            // Get stock name
            string companyTicker = Query.companyName;
            YQL += companyTicker;

            //Add start date to query (mm/dd/yyyy)
            YQL += "&a=" + Query.startMonth + "&b=" + Query.startDay + "&c=" + Query.startYear;

            //Add end date to query (dd/mm/yyyy)
            YQL += "&d=" + Query.endMonth + "&e=" + Query.endDay + "&f=" + Query.endYear;

            //Check for Resolution of the data (daily/weekly/monthly)
            if (Query.isDaily)
            {
                YQL += "&g=d";
                saveLocation = "Daily";
            }
            else if (Query.isWeekly)
            {
                YQL += "&g=w";
                saveLocation = "Weekly";
            }
            else if (Query.isMonthly)
            {
                YQL += "&g=m";
                saveLocation = "Monthly";
            }

            //File format when pulled from yahoo's API
            YQL += "&ignore=.csv";

            string pulledStock = Yahoo_Call.dsByYQL(YQL);

            //Save results to file
            QueryFile.writeToFile(YQL, saveLocation, companyTicker);
        }
    }
}
