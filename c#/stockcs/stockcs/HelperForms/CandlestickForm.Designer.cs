namespace stockcs.HelperForms
{
    partial class CandlestickForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea2 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend2 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series2 = new System.Windows.Forms.DataVisualization.Charting.Series();
            this.chCandleStick = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnSaveImage = new System.Windows.Forms.Button();
            this.chBarChart = new System.Windows.Forms.DataVisualization.Charting.Chart();
            this.gbInformationPanel = new System.Windows.Forms.GroupBox();
            this.lblTicker = new System.Windows.Forms.Label();
            this.lblPeriod = new System.Windows.Forms.Label();
            this.lblStartDate = new System.Windows.Forms.Label();
            this.lblEndDate = new System.Windows.Forms.Label();
            this.txtTicker = new System.Windows.Forms.TextBox();
            this.txtPeriod = new System.Windows.Forms.TextBox();
            this.txtStartDate = new System.Windows.Forms.TextBox();
            this.txtEndDate = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.chCandleStick)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chBarChart)).BeginInit();
            this.gbInformationPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // chCandleStick
            // 
            chartArea1.Name = "ChartArea1";
            this.chCandleStick.ChartAreas.Add(chartArea1);
            legend1.Name = "Legend1";
            this.chCandleStick.Legends.Add(legend1);
            this.chCandleStick.Location = new System.Drawing.Point(12, 12);
            this.chCandleStick.Name = "chCandleStick";
            series1.ChartArea = "ChartArea1";
            series1.Legend = "Legend1";
            series1.Name = "Series1";
            this.chCandleStick.Series.Add(series1);
            this.chCandleStick.Size = new System.Drawing.Size(1057, 525);
            this.chCandleStick.TabIndex = 0;
            this.chCandleStick.Text = "chCandleStick";
            // 
            // btnClose
            // 
            this.btnClose.Location = new System.Drawing.Point(1094, 66);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(102, 35);
            this.btnClose.TabIndex = 1;
            this.btnClose.Text = "Close";
            this.btnClose.UseVisualStyleBackColor = true;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnSaveImage
            // 
            this.btnSaveImage.Location = new System.Drawing.Point(1094, 12);
            this.btnSaveImage.Name = "btnSaveImage";
            this.btnSaveImage.Size = new System.Drawing.Size(102, 38);
            this.btnSaveImage.TabIndex = 2;
            this.btnSaveImage.Text = "Save Image";
            this.btnSaveImage.UseVisualStyleBackColor = true;
            this.btnSaveImage.Click += new System.EventHandler(this.btnSaveImage_Click);
            // 
            // chBarChart
            // 
            chartArea2.Name = "ChartArea1";
            this.chBarChart.ChartAreas.Add(chartArea2);
            legend2.Name = "Legend1";
            this.chBarChart.Legends.Add(legend2);
            this.chBarChart.Location = new System.Drawing.Point(12, 543);
            this.chBarChart.Name = "chBarChart";
            series2.ChartArea = "ChartArea1";
            series2.Legend = "Legend1";
            series2.Name = "Series1";
            this.chBarChart.Series.Add(series2);
            this.chBarChart.Size = new System.Drawing.Size(1057, 278);
            this.chBarChart.TabIndex = 3;
            this.chBarChart.Text = "chBarChart";
            // 
            // gbInformationPanel
            // 
            this.gbInformationPanel.Controls.Add(this.txtEndDate);
            this.gbInformationPanel.Controls.Add(this.txtStartDate);
            this.gbInformationPanel.Controls.Add(this.txtPeriod);
            this.gbInformationPanel.Controls.Add(this.txtTicker);
            this.gbInformationPanel.Controls.Add(this.lblEndDate);
            this.gbInformationPanel.Controls.Add(this.lblStartDate);
            this.gbInformationPanel.Controls.Add(this.lblPeriod);
            this.gbInformationPanel.Controls.Add(this.lblTicker);
            this.gbInformationPanel.Location = new System.Drawing.Point(1075, 125);
            this.gbInformationPanel.Name = "gbInformationPanel";
            this.gbInformationPanel.Size = new System.Drawing.Size(139, 229);
            this.gbInformationPanel.TabIndex = 4;
            this.gbInformationPanel.TabStop = false;
            this.gbInformationPanel.Text = "Information Panel:";
            // 
            // lblTicker
            // 
            this.lblTicker.AutoSize = true;
            this.lblTicker.Location = new System.Drawing.Point(7, 22);
            this.lblTicker.Name = "lblTicker";
            this.lblTicker.Size = new System.Drawing.Size(51, 17);
            this.lblTicker.TabIndex = 0;
            this.lblTicker.Text = "Ticker:";
            // 
            // lblPeriod
            // 
            this.lblPeriod.AutoSize = true;
            this.lblPeriod.Location = new System.Drawing.Point(10, 73);
            this.lblPeriod.Name = "lblPeriod";
            this.lblPeriod.Size = new System.Drawing.Size(53, 17);
            this.lblPeriod.TabIndex = 1;
            this.lblPeriod.Text = "Period:";
            // 
            // lblStartDate
            // 
            this.lblStartDate.AutoSize = true;
            this.lblStartDate.Location = new System.Drawing.Point(10, 124);
            this.lblStartDate.Name = "lblStartDate";
            this.lblStartDate.Size = new System.Drawing.Size(76, 17);
            this.lblStartDate.TabIndex = 2;
            this.lblStartDate.Text = "Start Date:";
            // 
            // lblEndDate
            // 
            this.lblEndDate.AutoSize = true;
            this.lblEndDate.Location = new System.Drawing.Point(10, 174);
            this.lblEndDate.Name = "lblEndDate";
            this.lblEndDate.Size = new System.Drawing.Size(71, 17);
            this.lblEndDate.TabIndex = 3;
            this.lblEndDate.Text = "End Date:";
            // 
            // txtTicker
            // 
            this.txtTicker.Enabled = false;
            this.txtTicker.Location = new System.Drawing.Point(13, 42);
            this.txtTicker.Name = "txtTicker";
            this.txtTicker.Size = new System.Drawing.Size(108, 22);
            this.txtTicker.TabIndex = 4;
            // 
            // txtPeriod
            // 
            this.txtPeriod.Enabled = false;
            this.txtPeriod.Location = new System.Drawing.Point(13, 93);
            this.txtPeriod.Name = "txtPeriod";
            this.txtPeriod.Size = new System.Drawing.Size(108, 22);
            this.txtPeriod.TabIndex = 5;
            // 
            // txtStartDate
            // 
            this.txtStartDate.Enabled = false;
            this.txtStartDate.Location = new System.Drawing.Point(13, 144);
            this.txtStartDate.Name = "txtStartDate";
            this.txtStartDate.Size = new System.Drawing.Size(108, 22);
            this.txtStartDate.TabIndex = 6;
            // 
            // txtEndDate
            // 
            this.txtEndDate.Enabled = false;
            this.txtEndDate.Location = new System.Drawing.Point(13, 194);
            this.txtEndDate.Name = "txtEndDate";
            this.txtEndDate.Size = new System.Drawing.Size(108, 22);
            this.txtEndDate.TabIndex = 7;
            // 
            // CandlestickForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1226, 833);
            this.Controls.Add(this.gbInformationPanel);
            this.Controls.Add(this.chBarChart);
            this.Controls.Add(this.btnSaveImage);
            this.Controls.Add(this.btnClose);
            this.Controls.Add(this.chCandleStick);
            this.Name = "CandlestickForm";
            this.Text = "stockcs";
            ((System.ComponentModel.ISupportInitialize)(this.chCandleStick)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chBarChart)).EndInit();
            this.gbInformationPanel.ResumeLayout(false);
            this.gbInformationPanel.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.DataVisualization.Charting.Chart chCandleStick;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnSaveImage;
        private System.Windows.Forms.DataVisualization.Charting.Chart chBarChart;
        private System.Windows.Forms.GroupBox gbInformationPanel;
        private System.Windows.Forms.TextBox txtEndDate;
        private System.Windows.Forms.TextBox txtStartDate;
        private System.Windows.Forms.TextBox txtPeriod;
        private System.Windows.Forms.TextBox txtTicker;
        private System.Windows.Forms.Label lblEndDate;
        private System.Windows.Forms.Label lblStartDate;
        private System.Windows.Forms.Label lblPeriod;
        private System.Windows.Forms.Label lblTicker;
    }
}