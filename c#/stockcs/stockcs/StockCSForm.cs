using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using stockcs.HelperClasses;
using System.IO;
using stockcs.HelperForms;

namespace stockcs
{
    public partial class StockCSForm : Form
    {
        private string fileLocation = "";
        private string resolution = "";
        private string display = "";
        private string ticker = "";
        private string URL = "";
        private string filename = "";

        private DateTime startingDate;
        private DateTime endingDate;


        public StockCSForm()
        {
            InitializeComponent();
            // Set the end date not to conflict with the start qestion
            this.dtpEndDate.MaxDate = DateTime.Today.AddDays(-1);
            this.dtpEndDate.Value = DateTime.Today.AddDays(-1);

            populateNasdaqComboBox();
            startingDate = dtpStartDate.Value;
            endingDate = dtpEndDate.Value;

            // build grid
            lsvStock.View = View.Details;
            lsvStock.GridLines = true;
            lsvStock.Sorting = SortOrder.Descending;
            lsvStock.Columns.Add("Date");
            lsvStock.Columns.Add("Open");
            lsvStock.Columns.Add("High");
            lsvStock.Columns.Add("Low");
            lsvStock.Columns.Add("Close");
            lsvStock.Columns.Add("Volume");
        }

        /// <summary>
        /// Create url sets up query
        /// </summary>
        public string createURL(string ticker, string resolution, string startDay, string startMonth, string startYear, string endDay, string endMonth, string endYear)
        {
            string saveLocation = "Save File location not set";

            //Set yahoo's address in YQL for attributes to be appended to
            string YQL = "http://ichart.yahoo.com/table.csv?s=";

            // Get stock name
            string companyTicker = ticker;
            YQL += companyTicker;

            //Add start date to query (mm/dd/yyyy)
            YQL += "&a=" + startMonth + "&b=" + startDay + "&c=" + startYear;

            //Add end date to query (dd/mm/yyyy)
            YQL += "&d=" + endMonth + "&e=" + endDay + "&f=" + endYear;

            //Check for resolution of the data (daily/weekly/monthly)
            switch (resolution)
            {
                case "Daily":
                    YQL += "&g=d";
                    break;
                case "Weekly":
                    YQL += "&g=w";
                    break;
                case "Monthly":
                    YQL += "&g=m";
                    break;
            }

            //File format when pulled from yahoo's API
            YQL += "&ignore=.csv";

            return YQL;
        }

        /// <summary>
        /// Populate the Nasdaq combox so that we have a list of nasdaq companies to choose from
        /// </summary>
        private void populateNasdaqComboBox()
        {
            aStock nasdaq = new aStock();
            string url = "http://www.nasdaq.com/screening/companies-by-industry.aspx?exchange=NASDAQ&render=download";

            //Save nasdaq information to the computer
            nasdaq.ReadFromURL(url);

            //Populate the ticker combobox
            string nasdaqFilePath = @"C:\DEV\STOCKDATA\NASDAQ\companylist.csv";
            string[] lines = File.ReadAllLines(nasdaqFilePath);

            string removeHeader = "\"Symbol\",\"Name\",\"LastSale\",\"MarketCap\",\"ADR TSO\",\"IPOyear\",\"Sector\",\"Industry\",\"Summary Quote\",";
            string removeWhiteSpace = "";
            lines = lines.Where(val => val != removeHeader).ToArray();
            lines = lines.Where(val => val != removeWhiteSpace).ToArray();
            foreach (var line in lines)
            {
                string[] ticker = line.Split(',', '"');
                cbCompanyTicker.Items.Add(ticker[1]);
            }
        }

        /// <summary>
        /// get select company ticker value
        /// </summary>
        private void cbCompanyTicker_SelectedIndexChanged(object sender, EventArgs e)
        {
            // get ticker value
            ticker = cbCompanyTicker.Text;

            // show date picker
            gbDatePicker.Visible = true;

            // show resolution
            gbResolution.Visible = true;

            // show load data
            gbLoadMethod.Visible = true;

            // show submit button
            btnSubmit.Visible = true;

            // show clear button
            btnClear.Visible = true;
        }

        /// <summary>
        /// Clear input fields of the form
        /// </summary>
        private void btnClear_Click(object sender, EventArgs e)
        {
            //Clear the fields of the form
            rbDaily.Checked = false;
            rbWeekly.Checked = false;
            rbMonthly.Checked = false;
            rbOnline.Checked = false;
            rbDisplay.Checked = false;

            // hide date picker
            gbDatePicker.Visible = false;

            // hide resolution
            gbResolution.Visible = false;

            // hide load data
            gbLoadMethod.Visible = false;

            // hide submit button
            btnSubmit.Visible = false;

            // hide clear button
            btnClear.Visible = false;

            // hide list view
            lsvStock.Visible = false;

            // clear list view
            lsvStock.Items.Clear();
        }

        /// <summary>
        /// Resolution -> User Picked Daily
        /// </summary>
        private void rbDaily_CheckedChanged(object sender, EventArgs e)
        {
            if (rbDaily.Checked == true)
            {
                resolution = fileLocation = "Daily";
                gbLoadMethod.Visible = true;
            }
        }

        /// <summary>
        /// Resolution -> User Picked Weekly
        /// </summary>
        private void rbWeekly_CheckedChanged(object sender, EventArgs e)
        {
            if (rbWeekly.Checked == true)
            {
                resolution = fileLocation = "Weekly";
                gbLoadMethod.Visible = true;
            }
        }

        /// <summary>
        /// Resolution -> User Picked Monthly
        /// </summary>
        private void rbMonthly_CheckedChanged(object sender, EventArgs e)
        {
            if (rbMonthly.Checked == true)
            {
                resolution = fileLocation = "Monthly";
                gbLoadMethod.Visible = true;
            }
        }

        /// <summary>
        /// Check Method -> Download from Online
        /// </summary>
        private void rbOnline_CheckedChanged(object sender, EventArgs e)
        {
            if (rbOnline.Checked == true)
            {
                display = "ONLINE";
                btnSubmit.Visible = true;
                btnSubmit.Text = "GO!";
            }
        }

        /// <summary>
        /// Load Method -> Load from Saved File
        /// </summary>
        private void rbDisplay_CheckedChanged(object sender, EventArgs e)
        {
            if (rbDisplay.Checked == true)
            {
                display = "DISPLAY";
                btnSubmit.Visible = true;
                btnSubmit.Text = "Display";
            }
        }

        /// <summary>
        /// Load data from csv file path to list view (performs reading from csv file here).
        /// </summary>
        public void loadDataToListView(string filePath, string searchStartDate, string searchEndDate)
        {
            // clear list view
            lsvStock.Items.Clear();

            // read from saved file
            string[] lines = File.ReadAllLines(filePath);
            string removeHeader = "Date,Open,High,Low,Close,Volume,Adj Close";
            string removeWhiteSpace = "";
            lines = lines.Where(val => val != removeHeader).ToArray();
            lines = lines.Where(val => val != removeWhiteSpace).ToArray();

            // read somewhere that this helps with speed
            // http://stackoverflow.com/questions/9008310/how-to-speed-adding-items-to-a-listview
            lsvStock.BeginUpdate();

            // read each line in from filePath
            foreach (string line in lines)
            {
                string[] data = line.Split(',');

                // add each element as a list view item (subitem)
                ListViewItem element = new ListViewItem(data[0]);  //date
                element.SubItems.Add(data[1]); //open
                element.SubItems.Add(data[2]); //high
                element.SubItems.Add(data[3]); //low
                element.SubItems.Add(data[4]); //close
                element.SubItems.Add(data[5]); //volume
                element.SubItems.Add(data[6]); //adj close


                lsvStock.Items.Add(element);
            }
            // stop updating list view
            lsvStock.EndUpdate();

            // auto resize columns
            for (int i = 0; i < lsvStock.Columns.Count - 1; i++)
            {
                lsvStock.AutoResizeColumn(i, ColumnHeaderAutoResizeStyle.ColumnContent);
            }
        }

        /// <summary>
        /// Date Picker -> Get Starting Date
        /// </summary>
        private void dtpStartDate_ValueChanged(object sender, EventArgs e)
        {
            startingDate = dtpStartDate.Value;
        }

        /// <summary>
        /// Date Picker -> Get Ending Date
        /// </summary>
        private void dtpEndDate_ValueChanged(object sender, EventArgs e)
        {
            endingDate = dtpEndDate.Value;
        }

        /// <summary>
        /// Submit button to get query based on the user options provided in the form
        /// </summary>
        private void btnSubmit_Click(object sender, EventArgs e)
        {
            aStock stock = new aStock(resolution, startingDate, endingDate, ticker);

            if (rbOnline.Checked == true)
            {
                // clear list view
                lsvStock.Items.Clear();

                //************************************
                //Pull from yahoo and save to computer
                //************************************
                // create url from ticker information
                URL = createURL(ticker, resolution,
                    startingDate.Day.ToString(), startingDate.Month.ToString(), startingDate.Year.ToString(),
                    endingDate.Day.ToString(), endingDate.Month.ToString(), endingDate.Year.ToString());

                // return data from Yahoo query url
                stock.ReadFromURL(URL);

                // populate list view with data!
                // read from file
                List<aCandlestick> stockInformation = stock.ReadFromFile(ticker);

                // read somewhere that this helps with speed
                // http://stackoverflow.com/questions/9008310/how-to-speed-adding-items-to-a-listview
                lsvStock.BeginUpdate();

                foreach (var line in stockInformation)
                {
                    // add each element as a list view item (subitem)
                    ListViewItem element = new ListViewItem(line.StartingDate.ToShortDateString()); // date
                    element.SubItems.Add(line.Open.ToString()); //open
                    element.SubItems.Add(line.High.ToString()); //high
                    element.SubItems.Add(line.Low.ToString()); //low
                    element.SubItems.Add(line.Close.ToString()); //close
                    element.SubItems.Add(line.Volume.ToString()); //volume

                    lsvStock.Items.Add(element);
                }
                // stop updating list view
                lsvStock.EndUpdate();

                // auto resize columns
                for (int i = 0; i < lsvStock.Columns.Count - 1; i++)
                {
                    lsvStock.AutoResizeColumn(i, ColumnHeaderAutoResizeStyle.ColumnContent);
                }

                // show list view
                lsvStock.Visible = true;

                // tell user the data has been downloaded
                //MessageBox.Show("Data from " + ticker + " was downloaded!");
            }
            else if (rbDisplay.Checked == true)
            {
                List<aCandlestick> stockInformation = stock.ReadFromFile(ticker);
                CandlestickForm modelessWindow = new CandlestickForm(stockInformation, ticker, resolution, startingDate, endingDate);
                modelessWindow.Show();
            }
        }
    }
}