package unoeste.fipp.mercadofipp.service;

import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.Foto;
import unoeste.fipp.mercadofipp.db.entity.Pergunta;
import unoeste.fipp.mercadofipp.db.entity.User;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;
import unoeste.fipp.mercadofipp.db.repository.QuestionRepository;

import javax.swing.text.html.HTMLDocument;
import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AdService {
    @Autowired
    private AdRepository adRepository;
    @Autowired
    private QuestionRepository questionRepository;

    public Ad getAd(Long id)
    {
        Ad ad = adRepository.findById(id).get();
        return ad;
    }

    public List<Ad> getAll(String filter){
        List<Ad> adList=null;
        if(filter.isEmpty())
            adList= adRepository.findAll();
        else
            adList=adRepository.findWithFilter(filter.toLowerCase());
        return adList;
    }
    public Ad addAd(Ad ad){
        try{
            ad=adRepository.save(ad);
        }
        catch(Exception e){
            ad=null;
        }
        return ad;
    }
    public boolean delAd(Long id)
    {
        try {
            adRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            return false;
        }
    }


    public Pergunta addQuestion(Pergunta pergunta) {
        try {
            Long adId = pergunta.getAd().getId();
            Ad ad = adRepository.findById(adId).orElseThrow(() -> new RuntimeException("Anúncio não encontrado"));

            // Associa o anúncio confirmado à pergunta e salva
            pergunta.setAd(ad);
            return questionRepository.save(pergunta);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public Pergunta  answerQuestion(Long questionId, String response, User currentUser) {
        Pergunta question = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException("Pergunta não encontrada"));
        Ad ad = question.getAd();
        if(!ad.getUser().equals(currentUser) && currentUser.getLevel()!= 'A'){
            throw new RuntimeException("Usuario não autorizado a responder essa pergunta");
        }
        question.setResp(response);
        return questionRepository.save(question);
    }

    public boolean savePhotos(Long adId, List<MultipartFile> files) {
        Optional<Ad> adOptional=adRepository.findById(adId);
        if(!adOptional.isPresent())
            return false;
        Ad ad = adOptional.get();
        for(MultipartFile file:files){
            try{


                String diretorio = "uploads/photos/";
                String fileName = UUID.randomUUID().toString()+"_"+file.getOriginalFilename();
                File destinationFile = new File(diretorio+fileName);

                //se o diretorio nao existir ele vai criar
                destinationFile.getParentFile().mkdirs();
                file.transferTo(destinationFile);

                Foto foto = new Foto();
                foto.setFilename(fileName);
                foto.setAd(ad);
                ad.getFotos().add(foto);

            }catch (Exception e){
                e.printStackTrace();
                return false;
            }
        }
        adRepository.save(ad);
        return true;
    }

    public List<Ad> getAllWithFilter(Long catId, Double minPrice, Double maxPrice, String startDate, String endDate, String sortBy) {
        //faz uma consulta personalizada com filtros
        Specification<Ad> spec = Specification.where(null);

        if (catId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("category").get("id"), catId));
        }

        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        if (startDate != null && endDate != null) {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            spec = spec.and((root, query, cb) -> cb.between(root.get("date"), start, end));
        }

        Sort sort = Sort.by("date").descending();
        if ("priceAsc".equals(sortBy)) {
            sort = Sort.by("price").ascending();
        } else if ("priceDesc".equals(sortBy)) {
            sort = Sort.by("price").descending();
        } else if ("recent".equals(sortBy)) {
            sort = Sort.by("date").descending();
        }

        return adRepository.findAll(spec, sort);
    }
    public List<Pergunta> getQuestionsByAd(Long adId) {
        return questionRepository.findByAdId(adId);
    }

}
