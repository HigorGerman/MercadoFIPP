package unoeste.fipp.mercadofipp.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.Pergunta;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;
import unoeste.fipp.mercadofipp.service.AdService;

import java.util.List;

@RestController
@RequestMapping(value="apis/ad")
public class AdRestController {
    
    @Autowired
    AdService adService;

    @GetMapping(value="get-one")
    public ResponseEntity<Object> getOne(Long id)
    {
        Ad ad=adService.getAd(id);
        if(ad!=null)
            return ResponseEntity.ok(ad);
        else
            return ResponseEntity.badRequest().body("erro");
    }
    @GetMapping(value="get-many")
    public ResponseEntity<Object> getMany()
    {
        return ResponseEntity.ok(adService.getAll(""));
    }
    @GetMapping(value="get-with-filter")
    public ResponseEntity<Object> getWithFilter(String filtro)
    {
        return ResponseEntity.ok(adService.getAll(filtro));
    }

    @PostMapping(value="add")
    public ResponseEntity<Object> add(@RequestBody Ad ad) {
        ad = adService.addAd(ad);
        if(ad!=null)
            return ResponseEntity.ok(ad);
        else
            return ResponseEntity.badRequest().body("Erro");
    }
    @PostMapping(value="add-question")
    public ResponseEntity<Object> addQuestion(@RequestBody Pergunta pergunta) {
        pergunta = adService.addQuestion(pergunta);
        if(pergunta!=null)
            return ResponseEntity.ok(pergunta);
        else
            return ResponseEntity.badRequest().body("Erro");
    }
    @GetMapping(value="delete")
    public ResponseEntity<Object> delete(Long id)
    {
        if(adService.delAd(id))
            return ResponseEntity.ok("ok");
        else
            return ResponseEntity.badRequest().body("erro");
    }
}
