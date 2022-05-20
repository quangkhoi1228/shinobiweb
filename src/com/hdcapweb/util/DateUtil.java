package com.hdcapweb.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import com.hdcapweb.config.DateTimeFormat;

public class DateUtil {

	public static int dayDiff(Date dayCurrent, Date dayInHistory) {
		return timeDiff(dayCurrent, dayInHistory, TimeUnit.DAYS);
	}

	public static int hourDiff(Date dayCurrent, Date dayInHistory) {
		return timeDiff(dayCurrent, dayInHistory, TimeUnit.HOURS);
	}

	public static int minuteDiff(Date dayCurrent, Date dayInHistory) {
		return timeDiff(dayCurrent, dayInHistory, TimeUnit.MINUTES);
	}

	public static int timeDiff(Date current, Date ago, TimeUnit timeunit) {
		int result = 0;
		long diffInMillies = Math.abs(current.getTime() - ago.getTime());
		result = (int) timeunit.convert(diffInMillies, TimeUnit.MILLISECONDS);

		if (result != 0) {
			if (current.before(ago)) {
				result = (-result);
			}
		}

		return result;
	}

	public static Date buildDate(int year, int month, int date, int hour, int minute, int second)
			throws ParseException {
		Calendar result = Calendar.getInstance();
		result.clear();
		result.set(year, month, date, hour, minute, second);
		return result.getTime();
	}

	public static Date addDate(Date begin, int addingDays) {
		return addTime(Calendar.DATE, addingDays, begin);
	}

	public static Date addHourToDate(Date begin, double addingHours) {
		int minutes = (int) (60 * addingHours);

		return addTime(Calendar.MINUTE, minutes, begin);
	}

	public static Date addTime(int calendar, int amount, Date date) {
		Calendar cal = Calendar.getInstance();

		cal.setTime(date);
		cal.add(calendar, amount);

		return cal.getTime();
	}

	public static Date addMonth(Date begin, int addMonth) {
		return addTime(Calendar.MONTH, addMonth, begin);
	}

	public static Date addMinute(Date begin, int addMinute) {
		return addTime(Calendar.MINUTE, addMinute, begin);
	}

	public static Date startOfDay(Date date) {
		LocalDateTime localDateTime = dateToLocalDateTime(date);
		LocalDateTime startOfDay = localDateTime.with(LocalTime.MIN);
		return localDateTimeToDate(startOfDay);
	}

	public static Date endOfDay(Date date) {
		LocalDateTime localDateTime = dateToLocalDateTime(date);
		LocalDateTime endOfDay = localDateTime.with(LocalTime.MAX);
		return localDateTimeToDate(endOfDay);
	}

	private static LocalDateTime dateToLocalDateTime(Date date) {
		return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
	}

	private static Date localDateTimeToDate(LocalDateTime localDateTime) {
		return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
	}

	public static String convertDateToString(DateTimeFormat datetimeFormat, Date date) {
		String result = "";
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(datetimeFormat.getValue());
			result = sdf.format(date);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return result;
	}

	public static Date parseStringToDate(String date, DateTimeFormat datetimeFormat) {
		Date result = null;

		if (datetimeFormat.equals(DateTimeFormat.DATETIME_FORMAT2)) {
			date = date.replace("T", " ");
			datetimeFormat = DateTimeFormat.DATETIME_FORMAT;
		}

		SimpleDateFormat sdf = new SimpleDateFormat(datetimeFormat.getValue());
		try {
			result = sdf.parse(date);
		} catch (ParseException e) {
//			e.printStackTrace();
		}
		return result;
	}

	public static String convertToNewDateStringFormat(String dateInStrBefore, DateTimeFormat formatBefore,
			DateTimeFormat formatAfter) {
		String result = "";

		if (formatBefore.equals(DateTimeFormat.DATETIME_FORMAT2)) {
			dateInStrBefore = dateInStrBefore.replace("T", " ");
			formatBefore = DateTimeFormat.DATETIME_FORMAT;
		}

		try {
			SimpleDateFormat format1 = new SimpleDateFormat(formatBefore.getValue());
			Date date = format1.parse(dateInStrBefore);
			SimpleDateFormat format2 = new SimpleDateFormat(formatAfter.getValue());
			result = format2.format(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
