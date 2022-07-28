using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace stockcs.HelperFunctions
{
    /// <summary>
    /// Queries to pull information from the Yahoo API
    /// Statements are writen with YQL (Yahoo Query Lang.)
    /// </summary>
    class Queries
    {
        /// <summary>
        /// Pass in a YQL statement, get a dataset back
        /// </summary>
        /// <param name="YQL"></param>
        /// <returns>dataset</returns>
        public string dsByYQL(string YQL)
        {
            string returnQueryText = "";

            //User Query to yahoo
            string url = @YQL;
            //Connection to yahoo server and download infomation
            var webClient = new WebClient();
            byte[] data = webClient.DownloadData(url);
            int index = data.Count();
            returnQueryText = index.ToString();
            string str = System.Text.Encoding.Default.GetString(data);
            returnQueryText = str;

            return returnQueryText;
        }

    }
}
