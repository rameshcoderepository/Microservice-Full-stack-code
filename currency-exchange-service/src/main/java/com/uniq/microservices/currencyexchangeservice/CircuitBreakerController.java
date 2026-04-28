package com.uniq.microservices.currencyexchangeservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.resilience4j.bulkhead.annotation.Bulkhead;

@RestController
public class CircuitBreakerController {
	
	private Logger logger = LoggerFactory.getLogger(CircuitBreakerController.class);
	
	@GetMapping("/sample-api")
	//@Retry(name = "sample-api", fallbackMethod = "hardcodedResponse")
	//@CircuitBreaker(name = "default", fallbackMethod = "hardcodedResponse")
	//@RateLimiter(name="default")
	@Bulkhead(name="sample-api")
	//10s => 10000 calls to the sample api
	public String sampleApi() {
		logger.info("Sample api call received");
//		ResponseEntity<String> forEntity = new RestTemplate().getForEntity("http://localhost:8080/some-dummy-url", 
//					String.class);
//		return forEntity.getBody();
		return "sample-api";
	}
	
	public String hardcodedResponse(Exception ex) {
		return "fallback-response";
	}
}


//What is Circuit Breaker?

//A circuit breaker (from libraries like Resilience4j) protects your service when another service is failing.
//
//If a downstream API keeps failing, stop calling it for some time instead of repeatedly trying and slowing everything down.
//
//States:
//Closed → normal calls  - 
//Open → stop calls, return fallback
//Half-open → try a few calls to check recovery

//Why needed?
//Prevents cascading failures
//Improves system stability
//Gives fallback response instead of crashing


//What is Rate Limiting?
//
//Rate limiter controls how many requests are allowed in a given time.
//
//Example:
//Max 10 requests per second
//If exceeded → reject or delay
//
//Why needed?
//Prevents overload
//Avoids abuse (e.g., too many API calls)
//Protects backend systems

//
//What is Bulkhead?
//
//@Bulkhead(name="sample-api")
//
//Isolate resources so failure in one part doesn’t affect others.
//
//Example:
//Limit number of concurrent calls (e.g., only 5 threads)
//Extra requests → rejected or queued



//Circuit Breaker	Stop calling failing service
//Rate Limiter	Limit number of requests
//Bulkhead	Limit concurrent threads

//Without protection:
//
//Service A → Service B (down ❌)
//→ keeps retrying → system crash
//
//With Circuit Breaker:
//
//Service A → Service B (fails ❌)
//→ circuit opens → fallback response ✅

