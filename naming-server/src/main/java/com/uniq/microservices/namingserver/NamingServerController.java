package com.uniq.microservices.namingserver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.Map;

@RestController
public class NamingServerController {

    @GetMapping("/api/status")
    public Map<String, String> home() {
        return Collections.singletonMap("message", "Naming Server (Eureka) is running - Service Registry & Discovery");
    }

}
