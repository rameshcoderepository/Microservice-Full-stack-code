package com.uniq.microservices.limitsservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.uniq.microservices.limitsservice.bean.Limits;
import com.uniq.microservices.limitsservice.configuration.Configuration;

@RestController
public class LimitsController {

	@Autowired
	private Configuration configuration;

	@GetMapping("/")
	public java.util.Map<String, String> home() {
		return java.util.Collections.singletonMap("message", "Limits Service is running");
	}

	@GetMapping("/limits")
	public Limits retrieveLimits() {
		return new Limits(configuration.getMinimum(),
				configuration.getMaximum());
		// return new Limits(1,1000);
	}

	@PostMapping("/limits")
	public Limits updateLimits(@RequestBody Limits limits) {
		if (limits == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Limits payload is required");
		}
		if (limits.getMinimum() >= limits.getMaximum()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Minimum must be less than maximum");
		}

		configuration.setMinimum(limits.getMinimum());
		configuration.setMaximum(limits.getMaximum());

		return retrieveLimits();
	}
}
