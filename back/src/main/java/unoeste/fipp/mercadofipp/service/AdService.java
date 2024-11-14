package unoeste.fipp.mercadofipp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import unoeste.fipp.mercadofipp.db.entity.Ad;
import unoeste.fipp.mercadofipp.db.entity.Foto;
import unoeste.fipp.mercadofipp.db.entity.Pergunta;
import unoeste.fipp.mercadofipp.db.repository.AdRepository;
import unoeste.fipp.mercadofipp.db.repository.QuestionRepository;

import java.io.File;
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
        try{
            pergunta=questionRepository.save(pergunta);
        }
        catch(Exception e){
            pergunta=null;
        }
        return pergunta;
    }

    public boolean savePhotos(Long adId, List<MultipartFile> files) {
        Optional<Ad> adOptional=adRepository.findById(adId);
        if(!adOptional.isPresent())
            return false;
        Ad ad = adOptional.get();
        for(MultipartFile file:files){
            try{

                //vai definir o diretorio de armazenamento
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

}
