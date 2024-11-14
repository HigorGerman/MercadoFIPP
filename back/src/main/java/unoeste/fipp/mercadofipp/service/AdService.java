package unoeste.fipp.mercadofipp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.Pergunta;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;
import unoeste.fipp.mercadofipp.db.repository.QuestionRepository;

import java.util.List;

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
        try{
            pergunta=questionRepository.save(pergunta);
        }
        catch(Exception e){
            pergunta=null;
        }
        return pergunta;
    }
}
