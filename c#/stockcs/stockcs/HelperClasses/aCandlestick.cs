using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace stockcs.HelperClasses
{
    public class aCandlestick
    {
        private Decimal _open, _high, _low, _close;
        private Double _volume;
        private DateTime _startingDate;

        public aCandlestick(decimal o, decimal h, decimal l, decimal c, double v, DateTime date)
        {
            this._open = o;
            this._high = h;
            this._low = l;
            this._close = c;
            this._volume = v;
            this._startingDate = date;
        }

        //Open -> Returns the opening price (Dec)
        public decimal Open
        {
            get { return this._open; }
        }

        //High -> Returns the high price (Dec)
        public decimal High
        {
            get { return this._high; }
        }

        //Low -> Returns the low price (Dec)
        public decimal Low
        {
            get { return this._low; }
        }

        //Close -> Returns the closing price (Dec)
        public decimal Close
        {
            get { return this._close; }
        }

        //Volume -> Returns the volume (Double)
        public double Volume
        {
            get { return this._volume; }
        }

        //StartingDate -> Returns the starting date of the candlestick (DateTime)
        public DateTime StartingDate
        {
            get { return this._startingDate; }
        }
    }
}