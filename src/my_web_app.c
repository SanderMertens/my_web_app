/* This is a managed file. Do not delete this comment. */

#include <my_web_app/my_web_app.h>

int cortomain(int argc, char *argv[]) {

    my_web_app_Car my_car = corto_declare(
        data_o, "my_car", my_web_app_Car_o);
    my_web_app_Car my_2nd_car = corto_declare(
        data_o, "my_2nd_car", my_web_app_Car_o);

    while (true) {
        corto_update_begin(my_car);
        if (!my_car->stop) {
            my_car->speed ++;
        }
        corto_update_end(my_car);

        corto_update_begin(my_2nd_car);
        if (!my_2nd_car->stop) {
            my_2nd_car->speed ++;
        }
        corto_update_end(my_2nd_car);

        corto_sleep(1, 0);
    }
    
    return 0;
}
