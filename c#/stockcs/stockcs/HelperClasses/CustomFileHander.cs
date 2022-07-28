using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using stockcs.HelperFunctions;

namespace stockcs.HelperClasses
{
    class CustomFileHander
    {
        /// <summary>
        /// Save query results to one of three files locations:
        ///     Daily   :   C:\DEV\STOCKDATA\Daily
        ///     WeeKly  :   C:\DEV\STOCKDATA\Weekly
        ///     Monthly :   C:\DEV\STOCKDATA\Monthly
        /// </summary>
        /// <param name="query">Data result of YQL statement from yahoo</param>
        /// <param name="storeLocation">Select which folder to write to</param>
        public void writeToFile(string query, string storeLocation, string companyTicker)
        {
            try
            {
                Queries sendQuery = new Queries();

                //Check to see if directories exist before they written to
                veriflyDirectories();

                //Submit Query to Yahoo's API 
                string queryResult = sendQuery.dsByYQL(query);
                switch (storeLocation)
                {
                    case "Daily":
                        using (StreamWriter w = File.CreateText("C:\\DEV\\STOCKDATA\\Daily\\" + companyTicker + ".csv"))
                        {
                            w.WriteLine(queryResult);
                        }
                        break;
                    case "Weekly":
                        using (StreamWriter w = File.CreateText("C:\\DEV\\STOCKDATA\\Weekly\\" + companyTicker + ".csv"))
                        {
                            w.WriteLine(queryResult);
                        }
                        break;
                    case "Monthly":
                        using (StreamWriter w = File.CreateText("C:\\DEV\\STOCKDATA\\Monthly\\" + companyTicker + ".csv"))
                        {
                            w.WriteLine(queryResult);
                        }
                        break;
                    default:
                        MessageBox.Show("ERROR: File could not be saved. \n\tYQL: " + query + "\n\tFile location: " + storeLocation);
                        break;
                }
            }
            catch (Exception e)
            {
                MessageBox.Show("Error: writeToFile | " + e.ToString());
            }

        }

        /// <summary>
        /// Read stored information from file.
        ///     Daily   :   C:\DEV\STOCKDATA\Daily
        ///     WeeKly  :   C:\DEV\STOCKDATA\Weekly
        ///     Monthly :   C:\DEV\STOCKDATA\Monthly    
        /// </summary>
        /// <param name="fileLocation">Select which file location to read from</param>
        public string readFromFile(string fileLocation, string companyTicker)
        {
            try
            {
                switch (fileLocation)
                {
                    case "Daily":
                        return "C:\\DEV\\STOCKDATA\\Daily\\" + companyTicker + ".csv";
                    case "Weekly":
                        return "C:\\DEV\\STOCKDATA\\Weekly\\" + companyTicker + ".csv";
                    case "Monthly":
                        return "C:\\DEV\\STOCKDATA\\Monthly\\" + companyTicker + ".csv";
                    default:
                        MessageBox.Show("ERROR: Could not read file.\n\tFile location selected: " + fileLocation);
                        return "ERROR";
                }
            }
            catch
            {
                MessageBox.Show("Error: readFromFile");
                throw;
            }
        }

        /// <summary>
        /// Check if directories exists to store the results of the YQL query
        /// </summary>
        public void veriflyDirectories()
        {

            try
            {
                string dailyPath = @"C:\DEV\STOCKDATA\Daily\";
                string weeklyPath = @"C:\DEV\STOCKDATA\Weekly\";
                string monthlyPath = @"C:\DEV\STOCKDATA\Monthly\";

                //Check if directory exists to save the YQL query
                //IF Directory does not exist, create that dirc
                if (!Directory.Exists(dailyPath))
                {
                    Directory.CreateDirectory(dailyPath);
                }
                if (!Directory.Exists(weeklyPath))
                {
                    Directory.CreateDirectory(weeklyPath);
                }
                if (!Directory.Exists(monthlyPath))
                {
                    Directory.CreateDirectory(monthlyPath);
                }
            }
            catch (Exception e)
            {
                MessageBox.Show("Error: QueryFileHander.veriflyDirectories\n" + e);
            }
        }
    }
}
