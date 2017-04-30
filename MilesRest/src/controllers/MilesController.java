package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.MilesDAO;
import entities.Miles;

@RestController
public class MilesController {
	
	@Autowired
	MilesDAO milesDao;
	
	// WORKING
	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	// WORKING
	@RequestMapping(path = "miles", method = RequestMethod.GET)
	public List<Miles> index() {
		return milesDao.index();
	}
	
	// WORKING
	@RequestMapping(path = "miles/{id}", method = RequestMethod.GET)
	public Miles show(@PathVariable int id) {
		return milesDao.show(id);
	}
	
	// WORKING
	@RequestMapping(path = "miles", method = RequestMethod.POST)
	public Miles create(@RequestBody String jsonMiles, HttpServletResponse res) {
		res.setStatus(201);
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			Miles newMiles = mapper.readValue(jsonMiles, Miles.class);
			return milesDao.create(newMiles);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return null;
	}
	
	// WORKING
	@RequestMapping(path = "miles/{id}", method = RequestMethod.PUT)
	public Miles update(@PathVariable int id, @RequestBody String jsonMiles, HttpServletResponse res) {
		res.setStatus(202);
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			Miles newMiles = mapper.readValue(jsonMiles, Miles.class);
			return milesDao.update(id, newMiles);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return null;
	}
	
	@RequestMapping(path = "miles/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		return milesDao.destroy(id);
	}
	
//	*** CALCULATIONS WILL BE DONE ON FRONT END ***
//	@RequestMapping(path = "miles", method = RequestMethod.GET)
//	public int tripMileage(@PathVariable int startMiles, @PathVariable int endMiles) {
//		return milesDao.calcTripMileage(startMiles, endMiles);
//	}
//
//	
//	@RequestMapping(path = "miles", method = RequestMethod.GET)
//	public int totalMileage(@PathVariable int tripMileage) {
//		return milesDao.calcTotalMileage(tripMileage);
//	}
}
