package com.ssafy.specialized.domain.graphql.output;

import com.ssafy.specialized.domain.entity.BusinessHour;
import lombok.*;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class NearbyStoreOutput {
    private int idx;
    private String name;
    private String subcategory;
    private String address;
    private Float distance;
    private int reviewCount;
    private int averageRating;
    private Boolean isBookmark;
    private String owner;
    private String contactNumber;
    private String homepage;
    private String imagesUrl;
    private List<String> imageUrls;
    private String explanation;
    private Float latitude;
    private Float longitude;
    private Boolean isClosedOnHolidays;
}
