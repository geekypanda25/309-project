package net.roll19.map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Controller
@RequestMapping(path="/map")
public class MainController {
	@Autowired
	private MapRepository mapRepository;
	
	@GetMapping(path="/add")
	public @ResponseBody String addNewUser (@RequestParam String name, @RequestParam String mapData) {
		
		Map n = new Map();
		n.setName(name);
		n.setMapData(mapData);
		mapRepository.save(n);
		return "Saved";
	}
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Map> getAllUsers() {
		return mapRepository.findAll();
	}

	@GetMapping(path = "/{id}")
	public @ResponseBody Iterable<Map> getMap(@PathVariable("id") Integer mapId)
	{
		return mapRepository.findAllById(Collections.singleton(mapId));
	}
}
