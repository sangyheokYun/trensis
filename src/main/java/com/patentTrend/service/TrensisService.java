package com.patentTrend.service;

import com.patentTrend.model.dto.Patent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrensisService {

    private KiprisService kiprisService;
    private TodayKiprisService todayKiprisService;
    private NaverService naverService;
    private GoogleTrendsService googleTrendsService;

    @Autowired
    public TrensisService(KiprisService kiprisService, TodayKiprisService todayKipris, NaverService naverService, GoogleTrendsService googleTrendsService) {
        this.kiprisService = kiprisService;
        this.todayKiprisService = todayKipris;
        this.naverService = naverService;
        this.googleTrendsService = googleTrendsService;
    }

    public Map<String, Integer> getAuthorityTotal(String searchWord, String authority){
        kiprisService.setSearchWord(searchWord);
        List<MakeKipris> authDocuments = kiprisService.makeAuthorityDocuments(authority);
        kiprisService.documentThreadRun(authDocuments);

        Map<String, Integer> authTotal = new HashMap<>();
        for(int i=0; i<authDocuments.size(); i++){
            authTotal.put(authDocuments.get(i).getStateName(), kiprisService.findTotal(authDocuments.get(i).getStateName()));
        }

        return authTotal;
    }

    public Map<String, Integer> getDocumentsTotal(String searchWord){
        kiprisService.setSearchWord(searchWord);
        List<MakeKipris> allDocuments = kiprisService.makeAllDocuments();
        kiprisService.documentThreadRun(allDocuments);

        Map<String, Integer> documentsTotal = new HashMap<>();
        for(int i=0; i<allDocuments.size(); i++){
            documentsTotal.put(allDocuments.get(i).getStateName(), kiprisService.findTotal(allDocuments.get(i).getStateName()));
        }

        return documentsTotal;
    }

    public Map<String, Integer> getDocumentsYearTotal(String searchWord, String authority,
                                                     String administration, String classify) {
        kiprisService.setSearchWord(searchWord);
        List<MakeKipris> yearDocuments = kiprisService.makeClassifyYearDocuments(authority, administration, classify);
        kiprisService.documentThreadRun(yearDocuments);

        Map<String, Integer> yearTotal = new HashMap<>();
        for(int i=0; i<yearDocuments.size(); i++){
            yearTotal.put(yearDocuments.get(i).getStateName(), kiprisService.findTotal(yearDocuments.get(i).getStateName()));
        }

        return yearTotal;
    }

    public Map<String, String> getTodayWord(){
        return todayKiprisService.getTodayWord();
    }

    public Map<String, Patent> getTodayPatent(){
        return todayKiprisService.getTodayPatent();
    }

    public List<String> getRelationWord(String searchWord){
        naverService.setSearchWord(searchWord);
        return naverService.getRelationWord();
    }

    public Map<String, List> getTrendsValue(String searchWord, String date){
        googleTrendsService.browserSetRun();
        googleTrendsService.setSearchWord(searchWord, date);

        return googleTrendsService.getTrendsValue();
    }

    public Map<String, List> getTrendsCompareValue(String searchWord, String compareWord, String date){
        googleTrendsService.browserSetRun();
        googleTrendsService.setSearchWord(searchWord, compareWord, date);

        return googleTrendsService.getTrendsValue();
    }


}
