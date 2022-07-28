using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace stockcs.HelperClasses
{
    /// <summary>
    /// SearchQuery will hold the results the user wants relating to company information.
    /// This will help with searching the yahoo API with YQL
    /// </summary>
    class SearchQuery
    {
        //Company Name
        public string companyName { get; set; }
        //Start Date
        public string startDay { get; set; }
        public string startMonth { get; set; }
        public string startYear { get; set; }
        //End Date
        public string endDay { get; set; }
        public string endMonth { get; set; }
        public string endYear { get; set; }
        //Resolution
        public bool isDaily { get; set; }
        public bool isWeekly { get; set; }
        public bool isMonthly { get; set; }
    }
}
