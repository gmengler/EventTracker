package data;

import java.util.List;

import entities.Miles;

public interface MilesDAO {
	public List<Miles> index();
	public Miles show(int id);
	public Miles create(Miles miles);
	public Miles update(int id, Miles miles);
	public boolean destroy(int id);
//	public int calcTripMileage(int start, int end);
//	public int calcTotalMileage(int tripMileage);
}
