namespace stockcs
{
    partial class StockCSForm
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
            this.lsvStock = new System.Windows.Forms.ListView();
            this.gbSearch = new System.Windows.Forms.GroupBox();
            this.btnSubmit = new System.Windows.Forms.Button();
            this.btnClear = new System.Windows.Forms.Button();
            this.gbLoadMethod = new System.Windows.Forms.GroupBox();
            this.rbDisplay = new System.Windows.Forms.RadioButton();
            this.rbOnline = new System.Windows.Forms.RadioButton();
            this.gbResolution = new System.Windows.Forms.GroupBox();
            this.rbMonthly = new System.Windows.Forms.RadioButton();
            this.rbWeekly = new System.Windows.Forms.RadioButton();
            this.rbDaily = new System.Windows.Forms.RadioButton();
            this.gbDatePicker = new System.Windows.Forms.GroupBox();
            this.dtpEndDate = new System.Windows.Forms.DateTimePicker();
            this.dtpStartDate = new System.Windows.Forms.DateTimePicker();
            this.lblEndDate = new System.Windows.Forms.Label();
            this.lblStartDate = new System.Windows.Forms.Label();
            this.panel1 = new System.Windows.Forms.Panel();
            this.cbCompanyTicker = new System.Windows.Forms.ComboBox();
            this.lbCompanyName = new System.Windows.Forms.Label();
            this.gbSearch.SuspendLayout();
            this.gbLoadMethod.SuspendLayout();
            this.gbResolution.SuspendLayout();
            this.gbDatePicker.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // lsvStock
            // 
            this.lsvStock.Location = new System.Drawing.Point(386, 11);
            this.lsvStock.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.lsvStock.Name = "lsvStock";
            this.lsvStock.Size = new System.Drawing.Size(507, 263);
            this.lsvStock.TabIndex = 11;
            this.lsvStock.UseCompatibleStateImageBehavior = false;
            this.lsvStock.Visible = false;
            // 
            // gbSearch
            // 
            this.gbSearch.Controls.Add(this.btnSubmit);
            this.gbSearch.Controls.Add(this.btnClear);
            this.gbSearch.Controls.Add(this.gbLoadMethod);
            this.gbSearch.Controls.Add(this.gbResolution);
            this.gbSearch.Controls.Add(this.gbDatePicker);
            this.gbSearch.Controls.Add(this.panel1);
            this.gbSearch.Location = new System.Drawing.Point(16, 11);
            this.gbSearch.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbSearch.Name = "gbSearch";
            this.gbSearch.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbSearch.Size = new System.Drawing.Size(351, 263);
            this.gbSearch.TabIndex = 10;
            this.gbSearch.TabStop = false;
            this.gbSearch.Text = "Search";
            // 
            // btnSubmit
            // 
            this.btnSubmit.Location = new System.Drawing.Point(270, 142);
            this.btnSubmit.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.btnSubmit.Name = "btnSubmit";
            this.btnSubmit.Size = new System.Drawing.Size(76, 110);
            this.btnSubmit.TabIndex = 7;
            this.btnSubmit.UseVisualStyleBackColor = true;
            this.btnSubmit.Visible = false;
            this.btnSubmit.Click += new System.EventHandler(this.btnSubmit_Click);
            // 
            // btnClear
            // 
            this.btnClear.Location = new System.Drawing.Point(270, 20);
            this.btnClear.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.btnClear.Name = "btnClear";
            this.btnClear.Size = new System.Drawing.Size(76, 116);
            this.btnClear.TabIndex = 6;
            this.btnClear.Text = "Clear";
            this.btnClear.UseVisualStyleBackColor = true;
            this.btnClear.Visible = false;
            this.btnClear.Click += new System.EventHandler(this.btnClear_Click);
            // 
            // gbLoadMethod
            // 
            this.gbLoadMethod.Controls.Add(this.rbDisplay);
            this.gbLoadMethod.Controls.Add(this.rbOnline);
            this.gbLoadMethod.Location = new System.Drawing.Point(6, 208);
            this.gbLoadMethod.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbLoadMethod.Name = "gbLoadMethod";
            this.gbLoadMethod.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbLoadMethod.Size = new System.Drawing.Size(259, 44);
            this.gbLoadMethod.TabIndex = 5;
            this.gbLoadMethod.TabStop = false;
            this.gbLoadMethod.Text = "Load Method";
            this.gbLoadMethod.Visible = false;
            // 
            // rbDisplay
            // 
            this.rbDisplay.AutoSize = true;
            this.rbDisplay.Location = new System.Drawing.Point(149, 20);
            this.rbDisplay.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.rbDisplay.Name = "rbDisplay";
            this.rbDisplay.Size = new System.Drawing.Size(75, 21);
            this.rbDisplay.TabIndex = 1;
            this.rbDisplay.Text = "Display";
            this.rbDisplay.UseVisualStyleBackColor = true;
            this.rbDisplay.CheckedChanged += new System.EventHandler(this.rbDisplay_CheckedChanged);
            // 
            // rbOnline
            // 
            this.rbOnline.AutoSize = true;
            this.rbOnline.Location = new System.Drawing.Point(34, 20);
            this.rbOnline.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.rbOnline.Name = "rbOnline";
            this.rbOnline.Size = new System.Drawing.Size(91, 21);
            this.rbOnline.TabIndex = 0;
            this.rbOnline.Text = "Download";
            this.rbOnline.UseVisualStyleBackColor = true;
            this.rbOnline.CheckedChanged += new System.EventHandler(this.rbOnline_CheckedChanged);
            // 
            // gbResolution
            // 
            this.gbResolution.Controls.Add(this.rbMonthly);
            this.gbResolution.Controls.Add(this.rbWeekly);
            this.gbResolution.Controls.Add(this.rbDaily);
            this.gbResolution.Location = new System.Drawing.Point(5, 142);
            this.gbResolution.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbResolution.Name = "gbResolution";
            this.gbResolution.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbResolution.Size = new System.Drawing.Size(260, 61);
            this.gbResolution.TabIndex = 4;
            this.gbResolution.TabStop = false;
            this.gbResolution.Text = "Resolution";
            this.gbResolution.Visible = false;
            // 
            // rbMonthly
            // 
            this.rbMonthly.AutoSize = true;
            this.rbMonthly.Location = new System.Drawing.Point(160, 21);
            this.rbMonthly.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.rbMonthly.Name = "rbMonthly";
            this.rbMonthly.Size = new System.Drawing.Size(78, 21);
            this.rbMonthly.TabIndex = 2;
            this.rbMonthly.Text = "Monthly";
            this.rbMonthly.UseVisualStyleBackColor = true;
            this.rbMonthly.CheckedChanged += new System.EventHandler(this.rbMonthly_CheckedChanged);
            // 
            // rbWeekly
            // 
            this.rbWeekly.AutoSize = true;
            this.rbWeekly.Location = new System.Drawing.Point(78, 21);
            this.rbWeekly.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.rbWeekly.Name = "rbWeekly";
            this.rbWeekly.Size = new System.Drawing.Size(75, 21);
            this.rbWeekly.TabIndex = 1;
            this.rbWeekly.Text = "Weekly";
            this.rbWeekly.UseVisualStyleBackColor = true;
            this.rbWeekly.CheckedChanged += new System.EventHandler(this.rbWeekly_CheckedChanged);
            // 
            // rbDaily
            // 
            this.rbDaily.AutoSize = true;
            this.rbDaily.Location = new System.Drawing.Point(12, 21);
            this.rbDaily.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.rbDaily.Name = "rbDaily";
            this.rbDaily.Size = new System.Drawing.Size(60, 21);
            this.rbDaily.TabIndex = 0;
            this.rbDaily.Text = "Daily";
            this.rbDaily.UseVisualStyleBackColor = true;
            this.rbDaily.CheckedChanged += new System.EventHandler(this.rbDaily_CheckedChanged);
            // 
            // gbDatePicker
            // 
            this.gbDatePicker.Controls.Add(this.dtpEndDate);
            this.gbDatePicker.Controls.Add(this.dtpStartDate);
            this.gbDatePicker.Controls.Add(this.lblEndDate);
            this.gbDatePicker.Controls.Add(this.lblStartDate);
            this.gbDatePicker.Location = new System.Drawing.Point(5, 57);
            this.gbDatePicker.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbDatePicker.Name = "gbDatePicker";
            this.gbDatePicker.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.gbDatePicker.Size = new System.Drawing.Size(260, 79);
            this.gbDatePicker.TabIndex = 3;
            this.gbDatePicker.TabStop = false;
            this.gbDatePicker.Text = "Select Time Frame";
            this.gbDatePicker.Visible = false;
            // 
            // dtpEndDate
            // 
            this.dtpEndDate.CustomFormat = "MM/dd/yyyy";
            this.dtpEndDate.Format = System.Windows.Forms.DateTimePickerFormat.Custom;
            this.dtpEndDate.Location = new System.Drawing.Point(91, 54);
            this.dtpEndDate.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.dtpEndDate.MaxDate = new System.DateTime(2015, 3, 3, 0, 0, 0, 0);
            this.dtpEndDate.MinDate = new System.DateTime(1990, 1, 1, 0, 0, 0, 0);
            this.dtpEndDate.Name = "dtpEndDate";
            this.dtpEndDate.Size = new System.Drawing.Size(160, 22);
            this.dtpEndDate.TabIndex = 3;
            this.dtpEndDate.Value = new System.DateTime(2015, 3, 3, 0, 0, 0, 0);
            this.dtpEndDate.ValueChanged += new System.EventHandler(this.dtpEndDate_ValueChanged);
            // 
            // dtpStartDate
            // 
            this.dtpStartDate.CustomFormat = "MM/dd/yyyy";
            this.dtpStartDate.Format = System.Windows.Forms.DateTimePickerFormat.Custom;
            this.dtpStartDate.Location = new System.Drawing.Point(91, 22);
            this.dtpStartDate.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.dtpStartDate.MaxDate = new System.DateTime(2015, 3, 2, 0, 0, 0, 0);
            this.dtpStartDate.MinDate = new System.DateTime(1990, 1, 1, 0, 0, 0, 0);
            this.dtpStartDate.Name = "dtpStartDate";
            this.dtpStartDate.Size = new System.Drawing.Size(160, 22);
            this.dtpStartDate.TabIndex = 2;
            this.dtpStartDate.Value = new System.DateTime(1990, 1, 1, 0, 0, 0, 0);
            this.dtpStartDate.ValueChanged += new System.EventHandler(this.dtpStartDate_ValueChanged);
            // 
            // lblEndDate
            // 
            this.lblEndDate.AutoSize = true;
            this.lblEndDate.Location = new System.Drawing.Point(8, 58);
            this.lblEndDate.Name = "lblEndDate";
            this.lblEndDate.Size = new System.Drawing.Size(67, 17);
            this.lblEndDate.TabIndex = 1;
            this.lblEndDate.Text = "End Date";
            // 
            // lblStartDate
            // 
            this.lblStartDate.AutoSize = true;
            this.lblStartDate.Location = new System.Drawing.Point(8, 26);
            this.lblStartDate.Name = "lblStartDate";
            this.lblStartDate.Size = new System.Drawing.Size(76, 17);
            this.lblStartDate.TabIndex = 0;
            this.lblStartDate.Text = "Start Date:";
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.cbCompanyTicker);
            this.panel1.Controls.Add(this.lbCompanyName);
            this.panel1.Location = new System.Drawing.Point(5, 20);
            this.panel1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(260, 31);
            this.panel1.TabIndex = 2;
            // 
            // cbCompanyTicker
            // 
            this.cbCompanyTicker.FormattingEnabled = true;
            this.cbCompanyTicker.Location = new System.Drawing.Point(119, 5);
            this.cbCompanyTicker.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.cbCompanyTicker.Name = "cbCompanyTicker";
            this.cbCompanyTicker.Size = new System.Drawing.Size(132, 24);
            this.cbCompanyTicker.TabIndex = 1;
            this.cbCompanyTicker.SelectedIndexChanged += new System.EventHandler(this.cbCompanyTicker_SelectedIndexChanged);
            // 
            // lbCompanyName
            // 
            this.lbCompanyName.AutoSize = true;
            this.lbCompanyName.Location = new System.Drawing.Point(4, 7);
            this.lbCompanyName.Name = "lbCompanyName";
            this.lbCompanyName.Size = new System.Drawing.Size(118, 17);
            this.lbCompanyName.TabIndex = 0;
            this.lbCompanyName.Text = "Company Ticker: ";
            // 
            // StockCSForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(904, 285);
            this.Controls.Add(this.lsvStock);
            this.Controls.Add(this.gbSearch);
            this.Name = "StockCSForm";
            this.Text = "StockCSForm";
            this.gbSearch.ResumeLayout(false);
            this.gbLoadMethod.ResumeLayout(false);
            this.gbLoadMethod.PerformLayout();
            this.gbResolution.ResumeLayout(false);
            this.gbResolution.PerformLayout();
            this.gbDatePicker.ResumeLayout(false);
            this.gbDatePicker.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListView lsvStock;
        private System.Windows.Forms.GroupBox gbSearch;
        private System.Windows.Forms.Button btnSubmit;
        private System.Windows.Forms.Button btnClear;
        private System.Windows.Forms.GroupBox gbLoadMethod;
        private System.Windows.Forms.RadioButton rbDisplay;
        private System.Windows.Forms.RadioButton rbOnline;
        private System.Windows.Forms.GroupBox gbResolution;
        private System.Windows.Forms.RadioButton rbMonthly;
        private System.Windows.Forms.RadioButton rbWeekly;
        private System.Windows.Forms.RadioButton rbDaily;
        private System.Windows.Forms.GroupBox gbDatePicker;
        private System.Windows.Forms.DateTimePicker dtpEndDate;
        private System.Windows.Forms.DateTimePicker dtpStartDate;
        private System.Windows.Forms.Label lblEndDate;
        private System.Windows.Forms.Label lblStartDate;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.ComboBox cbCompanyTicker;
        private System.Windows.Forms.Label lbCompanyName;
    }
}