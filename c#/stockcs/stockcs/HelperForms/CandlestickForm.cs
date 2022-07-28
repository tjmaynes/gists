using stockcs.HelperClasses;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace stockcs.HelperForms
{
    public partial class CandlestickForm : Form
    {
        private string tickerValue = "";
        public CandlestickForm(List<aCandlestick> candlestick, string ticker, string resolution, DateTime startDate, DateTime endDate)
        {
            InitializeComponent();
            populateChart(candlestick);
            populateVolumeChart(candlestick);
            txtTicker.Text = ticker;
            txtPeriod.Text = resolution;
            txtStartDate.Text = startDate.ToShortDateString();
            txtEndDate.Text = endDate.ToShortDateString();
            tickerValue = ticker;
            this.Text = ticker + ", " + resolution + ", " + startDate.ToShortDateString() + " - " + endDate.ToShortDateString();
        }
        private void populateChart(List<aCandlestick> candlestick)
        {
            // completely clear candlestick chart
            chCandleStick.Series.Clear();

            // initialize series for Candlestick
            Series candle = new Series("Ticker");
            chCandleStick.Series.Add(candle);
            chCandleStick.Name = "Candlestick Chart";

            // Set series chart type
            chCandleStick.Series["Ticker"].ChartType = SeriesChartType.Candlestick;

            // Set the style of the open-close marks
            chCandleStick.Series["Ticker"]["OpenCloseStyle"] = "Triangle";

            // Show both open and close marks
            chCandleStick.Series["Ticker"]["ShowOpenClose"] = "Both";

            // Set point width
            chCandleStick.Series["Ticker"]["PointWidth"] = "1.0";

            // Set colors bars
            chCandleStick.Series["Ticker"]["PriceUpColor"] = "Green";
            chCandleStick.Series["Ticker"]["PriceDownColor"] = "Red";

            int i = 0;

            // read each line in from candlestick list
            foreach (var line in candlestick)
            {
                // adding date and high
                chCandleStick.Series["Ticker"].Points.AddXY(line.StartingDate, Convert.ToDouble(line.High));
                // adding low
                chCandleStick.Series["Ticker"].Points[i].YValues[1] = Convert.ToDouble(line.Low);
                //adding open
                chCandleStick.Series["Ticker"].Points[i].YValues[2] = Convert.ToDouble(line.Open);
                // adding close
                chCandleStick.Series["Ticker"].Points[i].YValues[3] = Convert.ToDouble(line.Close);
                i++;
            }
        }
        private void populateVolumeChart(List<aCandlestick> candlestick)
        {
            // completely clear candlestick chart
            chBarChart.Series.Clear();

            // initialize series for Candlestick
            Series bar = new Series("Volume");
            chBarChart.Series.Add(bar);
            chBarChart.Name = "Volume Chart";

            chBarChart.ChartAreas[0].BackColor = Color.Transparent;
            //chBarChart.ChartAreas[0].AxisX.IntervalType = DateTimeIntervalType.Days;

            chBarChart.Palette = ChartColorPalette.Berry;

            // Set series chart type
            chBarChart.Series["Volume"].ChartType = SeriesChartType.Column;

            // read each line in from candlestick list
            foreach (var line in candlestick)
            {
                chBarChart.Series["Volume"].Points.AddXY(line.StartingDate, line.Volume);
            }
        }
        private void btnSaveImage_Click(object sender, EventArgs e)
        {
            // save png file to DEV folder
            // weird error with .net jit ??
            // string date = DateTime.Now.ToString("HH:mm:ss");
            chCandleStick.SaveImage("C:\\DEV\\candleChart_"+ tickerValue +".png", ChartImageFormat.Png);
            chBarChart.SaveImage("C:\\DEV\\volumeChart_" + tickerValue + ".png", ChartImageFormat.Png);
            MessageBox.Show("Candlestick Chart & Volume chart saved to C:\\DEV\\");
        }
        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
