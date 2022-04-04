import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';

const { RangePicker } = DatePicker;

RangeCalendarCustom.propTypes = {
    picker: PropTypes.string,
    onChange: PropTypes.func,
    allowClear: PropTypes.bool,
    style: PropTypes.object,
};

RangeCalendarCustom.defaultProps = {
    picker: 'date',
    onChange: null,
    allowClear: false,
    style: {},
};

function RangeCalendarCustom(props) {
    const { picker, onChange, allowClear, style } = props;

    let format = 'DD/MM/YYYY';

    if (picker === 'month') {
        format = 'MM/YYYY';
    }

    if (picker === 'year') {
        format = 'YYYY';
    }

    const handleChange = (date, dateString) => {
        if (!onChange) return;
        onChange(date, dateString);
    };

    return (
        <RangePicker
            style={style}
            locale={locale}
            picker={picker}
            format={format}
            onChange={handleChange}
            allowClear={allowClear}
        />
    );
}

export default RangeCalendarCustom;
