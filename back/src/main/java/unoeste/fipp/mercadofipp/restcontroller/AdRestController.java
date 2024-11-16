package unoeste.fipp.mercadofipp.restcontroller;

import org.hibernate.type.internal.ImmutableNamedBasicTypeImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.Pergunta;
import unoeste.fipp.mercadofipp.db.entity.User;
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
    public ResponseEntity<Object> getWithFilter(@RequestParam(required = false) Long catId,
                                                @RequestParam(required = false) Double minPrice,
                                                @RequestParam(required = false) Double maxPrice,
                                                @RequestParam(required = false) String startDate,
                                                @RequestParam(required = false) String endDate,
                                                @RequestParam(required = false) String sortBy, Sort sort)
    {
        return ResponseEntity.ok(adService.getAllWithFilter(catId, minPrice, maxPrice, startDate, endDate, sortBy));
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
            return ResponseEntity.badRequest().body("Erro ao add pergunta");
    }
    @PostMapping(value="answer-question")
    public ResponseEntity<Object> answerQuestion(@RequestParam Long questionId, @RequestParam String response, @AuthenticationPrincipal User currentUser) {
        Pergunta pergunta = adService.answerQuestion(questionId, response,currentUser);
        if(pergunta != null)
            return ResponseEntity.ok(pergunta);
        else
            return ResponseEntity.badRequest().body("Erro ao responder a pergunta");
    }

    @GetMapping("questions-by-ad")
    public ResponseEntity<Object> getQuestionsByAd(@RequestParam Long adId) {
        List<Pergunta> perguntas    = adService.getQuestionsByAd(adId);
        return ResponseEntity.ok(perguntas);
    }

    @GetMapping(value="delete")
    public ResponseEntity<Object> delete(Long id)
    {
        if(adService.delAd(id))
            return ResponseEntity.ok("ok");
        else
            return ResponseEntity.badRequest().body("erro");
    }

    @PostMapping(value = "add-photos")
    public ResponseEntity<?> uploadPhotos(@RequestParam("adId") Long adId, @RequestParam("files")List<MultipartFile> files){
        if(files.size()>3){
            return ResponseEntity.badRequest().body("O maximo de fotos permitidas são 3");
        }
        boolean sucesso = adService.savePhotos(adId,files);
        if(sucesso)
            return ResponseEntity.ok("Fotos adicionadas com sucesso");
        return ResponseEntity.badRequest().body("Erro ao adicionar as fotos");
    }


}
