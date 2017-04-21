package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Miles;

@Transactional
public class MilesDAOImpl implements MilesDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Miles> index() {
		String query = "Select m from Miles m";
		return em.createQuery(query, Miles.class).getResultList();
	}

	@Override
	public Miles show(int id) {
		return em.find(Miles.class, id);
	}

	@Override
	public Miles create(Miles miles) {
		em.persist(miles);
		em.flush();
		return miles;
	}

	@Override
	public Miles update(int id, Miles miles) {
		Miles m = em.find(Miles.class, id);
		m.setStartMiles(miles.getStartMiles());
		m.setEndMiles(miles.getEndMiles());
		m.setDate(miles.getDate());
		return m;
	}

	@Override
	public boolean destroy(int id) {
		Miles m = em.find(Miles.class, id);
		
		if(em.find(Miles.class, id) == null) {
			return false;
		} else {
			em.remove(m);
			return true;
		}
	}

	@Override
	public int totalMileage(int start, int end) {
		int total = 0;
		total = end - start;
		return total;
	}

}
