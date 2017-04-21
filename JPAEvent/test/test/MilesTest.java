package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Miles;

public class MilesTest {
	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	private Miles miles = null;
	
	@Test
	public void test() {
	  boolean pass = true;
	  assertEquals(pass, true);
	}
	
	@Before
	public void setUp() throws Exception{
		emf = Persistence.createEntityManagerFactory("Moto");
		em = emf.createEntityManager();
		miles = em.find(Miles.class, 1);
	}
	
	@After
	public void tearDown() throws Exception{
		em.close();
		emf.close();
	}
	
	@Test
	public void test_miles_has_starting() {
		assertEquals(100, miles.getStartMiles());
	}

	@Test
	public void test_miles_has_ending() {
		assertEquals(200, miles.getEndMiles());
	}
	
	@Test
	public void test_miles_has_date() {
		assertEquals("1-30-2017", miles.getDate());
	}
}
