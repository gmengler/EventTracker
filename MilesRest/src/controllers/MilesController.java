package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
	
	
	@RequestMapping(path = "miles". method = RequestMethod.POST)
	public Miles create(@RequestBody String)
	
	
}
