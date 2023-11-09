export function formatDateString(inputDate: string): string {
	const months = [
	  "Januari",
	  "Jebruari",
	  "Maret",
	  "April",
	  "Mei",
	  "Juni",
	  "Juli",
	  "Augustus",
	  "September",
	  "Oktober",
	  "November",
	  "Desember",
	];
  
	const date = new Date(inputDate);
	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
  
	return `${day} ${month} ${year}`;
  }