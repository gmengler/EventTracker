package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Miles {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "start_miles")
	private int startMiles;
	
	@Column(name = "end_miles")
	private int endMiles;
	
	private String date;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStartMiles() {
		return startMiles;
	}

	public void setStartMiles(int startMiles) {
		this.startMiles = startMiles;
	}

	public int getEndMiles() {
		return endMiles;
	}

	public void setEndMiles(int endMiles) {
		this.endMiles = endMiles;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Miles [id=" + id + ", startMiles=" + startMiles + ", endMiles=" + endMiles + ", date=" + date + "]";
	}

}
